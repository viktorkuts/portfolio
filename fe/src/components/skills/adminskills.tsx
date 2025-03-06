import { useImageService } from "@/services/imageService";
import { useSkillService } from "@/services/skillServices";
import { useDataContext } from "@/utils/dataprovider";
import { generateImageUrl, Skill } from "@/utils/models/Shared";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Table,
  Title,
  Modal,
  TextInput,
  FileInput,
  Image,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export const AdminSkills = () => {
  const imageService = useImageService();
  const skillService = useSkillService();
  const { resume, refresh } = useDataContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editingSkill, setEditingSkill] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      icon: {
        bucket: "portfolio",
        id: "",
      },
    },
  });

  const handleSubmit = (values: Skill) => {
    if (editingSkill) {
      if (!values.id) return;
      skillService.updateSkill(values.id, {
        name: values.name,
        icon: values.icon,
      });
    } else {
      skillService.addSkill({
        name: values.name,
        icon: values.icon,
      });
    }
    close();
    form.reset();
    setEditingSkill(false);
    refresh();
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(true);
    form.setValues({ name: skill.name, icon: skill.icon });
    open();
  };

  const uploadImageBlob = async () => {
    if (!image) return;
    const res = await imageService.addImage(image);
    form.setFieldValue("icon", res);
    setImage(null);
  };

  return (
    <Card>
      <Title>Skills</Title>
      <Group>
        <Button onClick={open}>+ Add</Button>
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Icon</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Id</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {resume?.skills?.map((s) => (
              <Table.Tr key={s.id}>
                <Table.Th>
                  <Image src={generateImageUrl(s.icon)} w="5em" />
                </Table.Th>
                <Table.Th>{s.name}</Table.Th>
                <Table.Th>{s.id}</Table.Th>
                <Table.Th>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() => {
                        form.setValues({
                          id: s.id,
                          name: s.name,
                          icon: s.icon,
                        });
                        openEditModal(s);
                      }}
                    >
                      <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => {
                        if (!s.id) return;
                        skillService.deleteSkill(s.id);
                        refresh();
                      }}
                    >
                      <IconTrash size={16} stroke={1.5} />
                    </ActionIcon>
                  </Group>
                </Table.Th>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <Modal
        opened={opened}
        onClose={() => {
          close();
          setEditingSkill(false);
          form.reset();
          setImage(null);
        }}
        title={editingSkill ? "Edit Skill" : "Add Skill"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {form.getInputProps("icon.id").value && (
            <Image src={generateImageUrl(form.getInputProps("icon").value)} />
          )}
          <Group>
            <FileInput
              value={image}
              onChange={(file) => {
                setImage(file);
              }}
              placeholder="Image"
            />
            {image && (
              <Button
                onClick={() => {
                  uploadImageBlob();
                  console.log("Upload the new image:", image);
                }}
              >
                Upload
              </Button>
            )}
          </Group>
          <TextInput
            label="Skill Name"
            placeholder="Enter skill name"
            {...form.getInputProps("name")}
          />
          <Group mt="md">
            <Button type="submit">{editingSkill ? "Update" : "Add"}</Button>
          </Group>
        </form>
      </Modal>
    </Card>
  );
};
