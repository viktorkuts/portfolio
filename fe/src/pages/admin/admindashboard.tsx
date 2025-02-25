import { useEffect, useRef, useState } from "react";

import style from "./admindashboard.module.css";
import {
  ActionIcon,
  Button,
  Card,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconPencil, IconTrash, IconCheck } from "@tabler/icons-react";
import { useDataContext } from "@/utils/dataprovider";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useTranslation } from "react-i18next";
import { useResumeService } from "@/services/resumeService";
import { WorkRequest } from "@/utils/models/WorkModel";
import { PatchInfo } from "@/utils/models/ResumeModel";
import { CommentResponse, CommentStatus } from "@/utils/models/Comments";
import { useCommentService } from "@/services/commentService";

export function AdminDashboard() {
  const { t } = useTranslation();
  const { resume, testimonials, refresh } = useDataContext();
  const resumeService = useResumeService();
  const commentService = useCommentService();
  const [openedWorkModal, { open: openWorkModal, close: closeWorkModal }] =
    useDisclosure(false);
  const [
    openedEditWorkModal,
    { open: openEditWorkModal, close: closeEditWorkModal },
  ] = useDisclosure(false);

  const [currentWorkId, setCurrentWorkId] = useState<string>("");

  const [userTitle, setUserTitle] = useState<string>(resume?.title || "");
  const [userDescription, setUserDescription] = useState<string>(
    resume?.description || ""
  );
  const [userAvatar, setUserAvatar] = useState<string>(resume?.avatar || "");

  const [selectedTestimonialFilter, setTestimonialFilter] =
    useState<CommentStatus>(CommentStatus.APPROVED);

  const formAddWork = useForm({
    mode: "uncontrolled",
    initialValues: {
      position: "",
      description: "",
      companyName: "",
    },
  });

  const [pendingTestimonials, setPendingTestimonials] =
    useState<CommentResponse[]>();

  const choosen = useRef(testimonials);

  const fetchPendingTestimonials = async () =>
    setPendingTestimonials(await commentService.getPendingTestimonials());

  useEffect(() => {
    refresh();
    fetchPendingTestimonials();
    if (selectedTestimonialFilter == CommentStatus.APPROVED) {
      choosen.current = testimonials;
    } else {
      choosen.current = pendingTestimonials;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTestimonialFilter, pendingTestimonials, testimonials]);

  const submitAddWork = async (val: WorkRequest) => {
    await resumeService.addWorkToResume(val);
  };

  const submitUpdateWork = async (val: WorkRequest, workId: string) => {
    await resumeService.updateWorkToResume(val, workId);
  };

  const deleteWork = async (workId: string) => {
    await resumeService.deleteWorkFromResume(workId);
  };

  const patchInfo = async (req: PatchInfo) => {
    await resumeService.patchInfo(req);
  };

  const approveComment = async (commentId: string) => {
    await commentService.approveTestimonial(commentId);
  };

  const deleteComment = async (commentId: string) => {
    await commentService.deleteTestimonial(commentId);
  };

  const rows = resume?.works.map((work, index) => (
    <Table.Tr key={index}>
      <Table.Th>
        <Group gap="sm">
          <div>
            <Text fz="sm" fw={500}>
              {work.position}
            </Text>
          </div>
        </Group>
      </Table.Th>
      <Table.Th>
        <Text fz="sm">{work.description}</Text>
      </Table.Th>
      <Table.Th>
        <Text fz="sm">{work.company.name}</Text>
      </Table.Th>
      <Table.Th>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => {
              formAddWork.setValues({
                position: work.position,
                description: work.description,
                companyName: work.company.name,
              });
              setCurrentWorkId(work.id);
              openEditWorkModal();
            }}
          >
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="red"
            onClick={() => {
              deleteWork(work.id);
              refresh();
            }}
          >
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Th>
    </Table.Tr>
  ));

  return (
    <Stack className={style.dashboard}>
      <Title>Admin Dashboard</Title>
      <Card>
        <Title>Profile</Title>
        <Stack>
          <TextInput
            label="Title"
            value={userTitle}
            onChange={(val) => {
              setUserTitle(val.target.value);
            }}
          ></TextInput>
          <TextInput
            label="Description"
            value={userDescription}
            onChange={(val) => {
              setUserDescription(val.target.value);
            }}
          ></TextInput>
          <TextInput
            label="Avatar"
            value={userAvatar}
            onChange={(val) => {
              setUserAvatar(val.target.value);
            }}
          />
          <Button
            onClick={() => {
              patchInfo({
                description: userDescription,
                title: userTitle,
                avatar: userAvatar,
              });
              refresh();
            }}
          >
            Save
          </Button>
        </Stack>
      </Card>
      <Card>
        <Modal
          opened={openedWorkModal}
          onClose={closeWorkModal}
          title="Add Work Experience"
        >
          <Card
            className={style.card}
            pos="relative"
            component="form"
            onSubmit={formAddWork.onSubmit((val) => {
              submitAddWork({
                position: val.position,
                description: val.description,
                company: {
                  name: val.companyName,
                },
              });
              closeWorkModal();
              refresh();
              formAddWork.reset();
            })}
          >
            <TextInput
              label="Position"
              placeholder="Manager"
              key={formAddWork.key("position")}
              {...formAddWork.getInputProps("position")}
            />
            <TextInput
              label="Description"
              placeholder="Managed a team"
              key={formAddWork.key("description")}
              {...formAddWork.getInputProps("description")}
            />
            <TextInput
              label="Company Name"
              placeholder="BigCorp"
              key={formAddWork.key("companyName")}
              {...formAddWork.getInputProps("companyName")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">{t("submit")}</Button>
            </Group>
          </Card>
        </Modal>

        <Modal
          opened={openedEditWorkModal}
          onClose={() => {
            closeEditWorkModal();
            formAddWork.reset();
          }}
          title="Edit Work Experience"
        >
          <Card
            className={style.card}
            pos="relative"
            component="form"
            onSubmit={formAddWork.onSubmit((val) => {
              submitUpdateWork(
                {
                  position: val.position,
                  description: val.description,
                  company: {
                    name: val.companyName,
                  },
                },
                currentWorkId
              );
              closeEditWorkModal();
              refresh();
              formAddWork.reset();
            })}
          >
            <TextInput
              label="Position"
              placeholder="Manager"
              key={formAddWork.key("position")}
              {...formAddWork.getInputProps("position")}
            />
            <TextInput
              label="Description"
              placeholder="Managed a team"
              key={formAddWork.key("description")}
              {...formAddWork.getInputProps("description")}
            />
            <TextInput
              label="Company Name"
              placeholder="BigCorp"
              key={formAddWork.key("companyName")}
              {...formAddWork.getInputProps("companyName")}
            />

            <Group justify="flex-end" mt="md">
              <Button type="submit">{t("submit")}</Button>
            </Group>
          </Card>
        </Modal>

        <Title>Work Experiences</Title>
        <Group>
          <Button
            onClick={() => {
              formAddWork.setValues({
                position: "",
                description: "",
                companyName: "",
              });
              openWorkModal();
            }}
          >
            + Add
          </Button>
        </Group>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Position</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Comapany</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
      <Card>
        <Title>Testimonials</Title>
        <Select
          label="Filter By"
          placeholder="Pick value"
          data={[CommentStatus.APPROVED, CommentStatus.PENDING]}
          value={selectedTestimonialFilter}
          onChange={(val) => {
            if (val == null) return;
            setTestimonialFilter(
              CommentStatus[val as keyof typeof CommentStatus]
            );
          }}
        ></Select>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>E-Mail</Table.Th>
                <Table.Th>Comment</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {choosen.current?.map((t) => (
                <Table.Tr>
                  <Table.Th>
                    <Group>
                      {t.user.userInfo.firstName} {t.user.userInfo.lastName}
                    </Group>
                  </Table.Th>
                  <Table.Th>{t.user.email}</Table.Th>
                  <Table.Th>{t.comment}</Table.Th>
                  <Table.Th>{t.title}</Table.Th>
                  <Table.Th>{t.status}</Table.Th>
                  <Table.Th>
                    <Group gap={0} justify="flex-end">
                      {selectedTestimonialFilter !== CommentStatus.APPROVED && (
                        <ActionIcon
                          variant="subtle"
                          color="green"
                          onClick={() => {
                            approveComment(t.id);
                            fetchPendingTestimonials();
                            refresh();
                          }}
                        >
                          <IconCheck size={16} stroke={1.5} />
                        </ActionIcon>
                      )}

                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => {
                          deleteComment(t.id);
                          fetchPendingTestimonials();
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
      </Card>
    </Stack>
  );
}
