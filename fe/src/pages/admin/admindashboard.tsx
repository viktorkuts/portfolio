import { useEffect, useRef, useState } from "react";

import style from "./admindashboard.module.css";
import {
  ActionIcon,
  Card,
  Group,
  Select,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { IconTrash, IconCheck } from "@tabler/icons-react";
import { useDataContext } from "@/utils/dataprovider";
import { useTranslation } from "react-i18next";
import { CommentResponse, CommentStatus } from "@/utils/models/Comments";
import { useCommentService } from "@/services/commentService";
import { AdminWorkList } from "@/components/works/adminworklist";
import { AdminSkills } from "@/components/skills/adminskills";
import { AdminProfile } from "@/components/profile/adminprofile";

export function AdminDashboard() {
  const { t } = useTranslation();
  const { testimonials, refresh } = useDataContext();
  const commentService = useCommentService();

  const [selectedTestimonialFilter, setTestimonialFilter] =
    useState<CommentStatus>(CommentStatus.APPROVED);

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
  }, [selectedTestimonialFilter]);

  const approveComment = async (commentId: string) => {
    await commentService.approveTestimonial(commentId);
  };

  const deleteComment = async (commentId: string) => {
    await commentService.deleteTestimonial(commentId);
  };

  return (
    <Stack className={style.dashboard}>
      <Title>{t("admin-dashboard")}</Title>
      <AdminProfile />
      <AdminWorkList style={style} />
      <Card>
        <Title>{t("testimonials-0")}</Title>
        <Select
          label={t("filter-by")}
          placeholder={t("pick-value")}
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
                <Table.Th>{t("name")}</Table.Th>
                <Table.Th>E-Mail</Table.Th>
                <Table.Th>{t("comment")}</Table.Th>
                <Table.Th>{t("title")}</Table.Th>
                <Table.Th>{t("status")}</Table.Th>
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
                            setTimeout(() => {
                              window.location.reload();
                            }, 500);
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
                          setTimeout(() => {
                            window.location.reload();
                          }, 500);
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
      <AdminSkills />
    </Stack>
  );
}
