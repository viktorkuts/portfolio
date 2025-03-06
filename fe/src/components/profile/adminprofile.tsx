import { useImageService } from "@/services/imageService";
import { useResumeService } from "@/services/resumeService";
import { useDataContext } from "@/utils/dataprovider";
import { PatchInfo } from "@/utils/models/ResumeModel";
import { generateImageUrl, ProfileLink } from "@/utils/models/Shared";
import {
  Button,
  Card,
  FileInput,
  Image,
  Table,
  Text,
  TextInput,
  Title,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const AdminProfile = () => {
  const imageService = useImageService();
  const { t } = useTranslation();
  const resumeService = useResumeService();
  const patchInfo = async (req: PatchInfo) => {
    await resumeService.patchInfo(req);
  };
  const { resume, refresh } = useDataContext();

  const formData = useForm({
    initialValues: {
      title: {
        english: "",
        french: "",
      },
      description: {
        english: "",
        french: "",
      },
      links: new Array<ProfileLink>(),
    },
  });

  const newLinkData = useForm({
    initialValues: {
      label: "",
      url: "",
      icon: {
        id: "",
        bucket: "",
      },
    },
  });

  const uploadImageBlobNew = async () => {
    if (!newImage) return;
    const res = await imageService.addImage(newImage);
    newLinkData.setFieldValue("icon", res);
    setNewImage(null);
  };

  useEffect(() => {
    if (!resume) return;
    formData.setValues({
      title: {
        english: resume.title || "",
        french: resume.titleFr || "",
      },
      description: {
        english: resume.description || "",
        french: resume.descriptionFr || "",
      },
      links: resume.links,
    });
    formData.resetDirty({
      title: {
        english: resume.title || "",
        french: resume.titleFr || "",
      },
      description: {
        english: resume.description || "",
        french: resume.descriptionFr || "",
      },
      links: resume.links,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resume]);

  const [img, setImg] = useState<File | null>(null);
  const [linkModalOpened, setLinkModalOpened] = useState(false);
  const [newImage, setNewImage] = useState<File | null>();

  const uploadImageBlob = async () => {
    if (!img || !resume?.avatar.id) return;
    await imageService.updateImage(resume?.avatar.id, img);
    setImg(null);
    refresh();
  };

  const submitHandler = async (val: {
    title: { english: string; french: string };
    description: { english: string; french: string };
    links: ProfileLink[];
  }) => {
    await patchInfo({
      title: val.title.english,
      titleFr: val.title.french,
      description: val.description.english,
      descriptionFr: val.description.french,
      links: val.links,
    });
    refresh();
  };

  const handleAddLink = async (val: {
    label: string;
    url: string;
    icon: { id: string; bucket: string };
  }) => {
    if (val.label && val.url && val.icon) {
      formData.values.links.push(val);
      newLinkData.reset();
      setLinkModalOpened(false);
    }
  };

  return (
    <Card>
      <Title>{t("profile")}</Title>
      <form onSubmit={formData.onSubmit(submitHandler)}>
        <Image w="10em" src={generateImageUrl(resume?.avatar)} />
        <Text>
          {t(
            "note-only-avatar-image-has-a-cache-policy-of-2-minutes-might-not-display-updated-content-right-away"
          )}
        </Text>
        <FileInput value={img} onChange={setImg} placeholder="Image upload.." />
        {img && <Button onClick={uploadImageBlob}>Upload</Button>}
        <TextInput
          label={t("title")}
          value={formData.key("title.english")}
          {...formData.getInputProps("title.english")}
        />
        <TextInput
          label={t("title-fr")}
          value={formData.key("title.french")}
          {...formData.getInputProps("title.french")}
        />
        <TextInput
          label={t("description")}
          value={formData.key("description.english")}
          {...formData.getInputProps("description.english")}
        />
        <TextInput
          label={t("description-fr")}
          value={formData.key("description.french")}
          {...formData.getInputProps("description.french")}
        />
        <Text>{t("links")}</Text>
        <Button onClick={() => setLinkModalOpened(true)}>+ Add Link</Button>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Label</Table.Th>
                <Table.Th>URL</Table.Th>
                <Table.Th>Icon</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {formData.values.links.map((l, index) => (
                <Table.Tr key={index}>
                  <Table.Th>{l.label}</Table.Th>
                  <Table.Th>{l.url}</Table.Th>
                  <Table.Th>
                    <Image w="5em" src={generateImageUrl(l.icon)} />
                  </Table.Th>
                  <Table.Th>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => {
                        formData.setFieldValue(
                          "links",
                          formData.values.links.filter((e) => e != l)
                        );
                      }}
                    >
                      <IconTrash size={16} stroke={1.5} />
                    </ActionIcon>
                  </Table.Th>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        <Button type="submit" loading={formData.submitting}>
          {t("save")}
        </Button>
      </form>

      {/* Modal for Adding Links */}
      <Modal
        opened={linkModalOpened}
        onClose={() => setLinkModalOpened(false)}
        title="Add New Link"
      >
        <form onSubmit={newLinkData.onSubmit(handleAddLink)}>
          {newLinkData.values.icon.id && (
            <Image src={generateImageUrl(newLinkData.values.icon)} />
          )}
          <TextInput
            label="Link Label"
            value={newLinkData.key("label")}
            required
            {...newLinkData.getInputProps("label")}
          />
          <TextInput
            label="Link URL"
            value={newLinkData.key("url")}
            {...newLinkData.getInputProps("url")}
            required
          />
          <FileInput
            label="Link Icon"
            value={newImage}
            onChange={(file) => {
              setNewImage(file);
            }}
            placeholder="Image"
          />
          {newImage && (
            <Button onClick={uploadImageBlobNew}>Upload Image</Button>
          )}
          <Button type="submit">Add Link</Button>
        </form>
      </Modal>
    </Card>
  );
};
