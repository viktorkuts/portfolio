import { useResumeService } from "@/services/resumeService";
import { useDataContext } from "@/utils/dataprovider";
import { generateImageUrl } from "@/utils/models/Shared";
import { WorkRequest, WorkResponse } from "@/utils/models/WorkModel";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Image,
  Modal,
  MultiSelect,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
  FileInput,
} from "@mantine/core";
// import { DateInput, DateInputProps } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
// import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
import { useImageService } from "@/services/imageService";

type Props = {
  style: CSSModuleClasses;
};

export const AdminWorkList = ({ style }: Props) => {
  // dayjs.extend(customParseFormat);
  const imageService = useImageService();
  const { t } = useTranslation();
  const { resume, refresh } = useDataContext();
  const [currentWorkId, setCurrentWorkId] = useState<string>("");
  const resumeService = useResumeService();
  const [opened, { open, close }] = useDisclosure(false);
  const [editing, setEditing] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  // const monthYearParser: DateInputProps["dateParser"] = (input) => {
  //   const parsedDate = dayjs(input, "MMMM YYYY", true);
  //   return parsedDate.isValid() ? parsedDate.toDate() : null;
  // };

  const formAddWork = useForm({
    mode: "uncontrolled",
    initialValues: {
      position: "",
      positionFr: "",
      description: "",
      descriptionFr: "",
      companyName: "",
      skills: Array<string>(),
      image: {
        bucket: "portfolio",
        id: "",
      },
    },
  });

  const submitWork = async (val: WorkRequest) => {
    if (editing) {
      await resumeService.updateWorkToResume(val, currentWorkId);
    } else {
      await resumeService.addWorkToResume(val);
    }
    close();
    refresh();
    formAddWork.reset();
    setImage(null);
    setEditing(false);
  };

  const uploadImageBlob = async () => {
    if (!image) return;
    const res = await imageService.addImage(image);
    formAddWork.setFieldValue("image", res);
    setImage(null);
  };

  const openEditModal = (work: WorkResponse) => {
    formAddWork.setValues({
      position: work.position,
      positionFr: work.positionFr,
      description: work.description,
      descriptionFr: work.descriptionFr,
      companyName: work.company.name,
      skills: work.skills.map((s) => s.id!),
      image: work.image,
    });
    setCurrentWorkId(work.id);
    setEditing(true);
    open();
  };

  const deleteWork = async (workId: string) => {
    await resumeService.deleteWorkFromResume(workId);
    refresh();
  };

  const rows = resume?.works.map((work, index) => (
    <Table.Tr key={index}>
      <Table.Th>
        <Image src={generateImageUrl(work.image)} w="5em" />
      </Table.Th>
      <Table.Th>
        <Group gap="sm">
          <div>
            <Text fz="sm" fw={500}>
              {work.position}
            </Text>
            <Text fz="sm" fw={500}>
              {work.positionFr}
            </Text>
          </div>
        </Group>
      </Table.Th>
      <Table.Th>
        <Text fz="sm">{work.description}</Text>
        <Text fz="sm">{work.descriptionFr}</Text>
      </Table.Th>
      <Table.Th>
        <Text fz="sm">{work.company.name}</Text>
      </Table.Th>
      <Table.Th>
        <Stack>
          {work?.skills?.map((s) => (
            <Tooltip label={s.name} key={s.id}>
              <Image w="3em" src={generateImageUrl(s.icon)} />
            </Tooltip>
          ))}
        </Stack>
      </Table.Th>
      <Table.Th>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => openEditModal(work)}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => deleteWork(work.id)}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Th>
    </Table.Tr>
  ));

  return (
    <Card>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          formAddWork.reset();
          setImage(null);
          setEditing(false);
        }}
        title={editing ? t("edit-work-experience") : t("add-work-experience")}
      >
        <Card
          className={style.card}
          pos="relative"
          component="form"
          onSubmit={formAddWork.onSubmit((val) => {
            submitWork({
              position: val.position,
              positionFr: val.positionFr,
              description: val.description,
              descriptionFr: val.descriptionFr,
              company: {
                name: val.companyName,
              },
              skills: val.skills,
              image: val.image,
            });
          })}
        >
          {formAddWork.getValues().image.id && (
            <Image
              src={generateImageUrl(formAddWork.getValues().image)}
              h="1em"
            />
          )}
          <FileInput
            value={image}
            onChange={(file) => {
              setImage(file);
              formAddWork.setFieldValue("image", {
                bucket: "portfolio",
                id: file?.name || "",
              });
            }}
            label={t("image")}
            placeholder={t("upload-image")}
          />
          {image && (
            <Button
              onClick={() => {
                uploadImageBlob();
              }}
            >
              {t("upload")}
            </Button>
          )}
          <TextInput
            label={t("position")}
            placeholder={t("manager")}
            key={formAddWork.key("position")}
            {...formAddWork.getInputProps("position")}
          />
          <TextInput
            label={t("position-french")}
            placeholder={t("manager-0")}
            key={formAddWork.key("positionFr")}
            {...formAddWork.getInputProps("positionFr")}
          />
          <TextInput
            label={t("description")}
            placeholder={t("managed-a-team")}
            key={formAddWork.key("descriptionFr")}
            {...formAddWork.getInputProps("description")}
          />
          <TextInput
            label={t("description-french")}
            placeholder={t("managed-a-team-0")}
            key={formAddWork.key("description")}
            {...formAddWork.getInputProps("descriptionFr")}
          />
          <TextInput
            label={t("company-name")}
            placeholder="BigCorp"
            key={formAddWork.key("companyName")}
            {...formAddWork.getInputProps("companyName")}
          />
          <MultiSelect
            label={t("technologies")}
            placeholder="TypeScript"
            data={resume?.skills.map((s) => ({ value: s.id!, label: s.name }))}
            key={formAddWork.key("skills")}
            {...formAddWork.getInputProps("skills")}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">{t("submit")}</Button>
          </Group>
        </Card>
      </Modal>

      <Title>{t("work-experiences")}</Title>
      <Group>
        <Button
          onClick={() => {
            formAddWork.setValues({
              position: "",
              positionFr: "",
              description: "",
              descriptionFr: "",
              companyName: "",
              skills: new Array<string>(),
              image: {
                bucket: "portfolio",
                id: "",
              },
            });
            setEditing(false);
            open();
          }}
        >
          {t("add")}
        </Button>
      </Group>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t("icon")}</Table.Th>
              <Table.Th>{t("position")}</Table.Th>
              <Table.Th>{t("description")}</Table.Th>
              <Table.Th>{t("company")}</Table.Th>
              {/* <Table.Th>{t("function-start")}</Table.Th>
              <Table.Th>{t("function-end")}</Table.Th> */}
              <Table.Th>{t("technologies")}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );
};
