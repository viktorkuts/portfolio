import { useImageService } from "@/services/imageService";
import { useProjectService } from "@/services/projectService";
import { useDataContext } from "@/utils/dataprovider";
import { ProjectRequest, ProjectResponse } from "@/utils/models/Projects";
import {
  generateImageUrl,
  Image as ImageModel,
  ProfileLink,
} from "@/utils/models/Shared";
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
  Tooltip,
  MultiSelect,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const AdminProjects = () => {
  const { t } = useTranslation();
  const imageService = useImageService();
  const projectService = useProjectService();
  const { resume, refresh } = useDataContext();
  const [opened, { open, close }] = useDisclosure(false);
  const [editingProject, setEditingProject] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [openLinkModal, setOpenLinkModal] = useState<boolean>(false);
  const [linkIcons, setLinkIcons] = useState<ImageModel[]>();

  const fetchIcons = async () => {
    const images = await projectService.getProjectIcons();
    setLinkIcons(images);
  };

  useEffect(() => {
    fetchIcons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    initialValues: {
      id: "",
      name: "",
      description: "",
      descriptionFr: "",
      links: new Array<ProfileLink>(),
      skills: new Array<string>(),
      image: {
        bucket: "portfolio",
        id: "",
      },
    },
  });

  const handleSubmit = (values: ProjectRequest) => {
    if (editingProject) {
      if (!values.id) return;
      projectService.updateProject(values.id, {
        name: values.name,
        description: values.description,
        descriptionFr: values.descriptionFr,
        links: values.links,
        skills: values.skills,
        image: values.image,
      });
    } else {
      projectService.addProject({
        name: values.name,
        description: values.description,
        descriptionFr: values.descriptionFr,
        links: values.links,
        skills: values.skills,
        image: values.image,
      });
    }
    close();
    form.reset();
    setEditingProject(false);
    refresh();
  };

  const openEditModal = (project: ProjectResponse) => {
    setEditingProject(true);
    form.setValues({
      name: project.name,
      description: project.description,
      descriptionFr: project.descriptionFr,
      links: project.links,
      skills: project.skills.map((s) => s.id).filter((s) => s !== undefined),
      image: project.image,
    });
    open();
  };

  const uploadImageBlob = async () => {
    if (!image) return;
    const res = await imageService.addImage(image);
    form.setFieldValue("image", res);
    setImage(null);
  };

  const linkForm = useForm({
    initialValues: {
      url: "",
      label: "",
      icon: {
        id: "",
        bucket: "link-icons",
      },
    },
  });

  const submitLink = async (link: ProfileLink) => {
    form.values.links.push(link);
    linkForm.reset();
  };

  return (
    <Card>
      <Title>Projects</Title>
      <Group>
        <Button onClick={open}>+ Add</Button>
      </Group>

      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Icon</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th>Links</Table.Th>
              <Table.Th>Skills</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {resume?.projects?.map((p) => (
              <Table.Tr key={p.id}>
                <Table.Th>
                  <Image src={generateImageUrl(p.image)} w="5em" />
                </Table.Th>
                <Table.Th>{p.name}</Table.Th>
                <Table.Th>{p.description}</Table.Th>
                <Table.Th>
                  <Group>
                    {p.links.map((l, index) => (
                      <Tooltip label={l.label} key={index}>
                        <a href={l.url} target="_blank">
                          <Image
                            bg="blue"
                            w="3em"
                            src={generateImageUrl(l.icon)}
                          />
                        </a>
                      </Tooltip>
                    ))}
                  </Group>
                </Table.Th>
                <Table.Th>
                  <Group>
                    {p.skills.map((s, index) => (
                      <Tooltip label={s.name} key={index}>
                        <Image w="3em" src={generateImageUrl(s.icon)} />
                      </Tooltip>
                    ))}
                  </Group>
                </Table.Th>
                <Table.Th>
                  <Group gap={0} justify="flex-end">
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={() => {
                        form.setValues({
                          id: p.id,
                          name: p.name,
                          description: p.description,
                          descriptionFr: p.descriptionFr,
                          links: p.links,
                          skills: p.skills
                            .map((e) => e.id)
                            .filter((s) => s !== undefined),
                          image: p.image,
                        });
                        openEditModal(p);
                      }}
                    >
                      <IconPencil size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => {
                        if (!p.id) return;
                        projectService.deleteProject(p.id);
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
          setEditingProject(false);
          form.reset();
          setImage(null);
        }}
        title={editingProject ? "Edit Project" : "Add Project"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {form.values.image.id && (
            <Image src={generateImageUrl(form.values.image)} />
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
            label={t("project-name")}
            placeholder="Portfolio"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            label={t("project-description")}
            placeholder="A simple project with Java"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <TextInput
            label={t("project-description-fr")}
            placeholder="Un projet simple avec Java"
            key={form.key("descriptionFr")}
            {...form.getInputProps("descriptionFr")}
          />
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
                {form.values.links.map((l, index) => (
                  <Table.Tr key={index}>
                    <Table.Th>{l.label}</Table.Th>
                    <Table.Th>{l.url}</Table.Th>
                    <Table.Th>
                      <Image bg="blue" w="5em" src={generateImageUrl(l.icon)} />
                    </Table.Th>
                    <Table.Th>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => {
                          form.setFieldValue(
                            "links",
                            form.values.links.filter((e) => e != l)
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
          <Button onClick={() => setOpenLinkModal(!openLinkModal)}>
            Add Link
          </Button>
          <MultiSelect
            label={t("technologies")}
            placeholder="TypeScript"
            data={resume?.skills.map((s) => ({ value: s.id!, label: s.name }))}
            key={form.key("skills")}
            {...form.getInputProps("skills")}
          />
          <Group mt="md">
            <Button type="submit">{editingProject ? "Update" : "Add"}</Button>
          </Group>
        </form>
      </Modal>
      {openLinkModal && (
        <Modal opened={openLinkModal} onClose={() => setOpenLinkModal(false)}>
          <form onSubmit={linkForm.onSubmit(submitLink)}>
            <TextInput
              label="Label"
              placeholder="GitHub"
              value={linkForm.key("label")}
              {...linkForm.getInputProps("label")}
            />
            <TextInput
              label="URL"
              placeholder="https://github.com"
              value={linkForm.key("url")}
              {...linkForm.getInputProps("url")}
            />
            <Select
              label="Link Icon"
              data={linkIcons?.map((l) => l.id)}
              renderOption={({ option }) => (
                <Group>
                  <Image
                    bg="blue"
                    w="3em"
                    src={generateImageUrl({
                      id: option.value,
                      bucket: "link-icons",
                    })}
                  />
                </Group>
              )}
              value={linkForm.key("icon.id")}
              {...linkForm.getInputProps("icon.id")}
            />
            <Button type="submit">{t("add")}</Button>
          </form>
        </Modal>
      )}
    </Card>
  );
};
