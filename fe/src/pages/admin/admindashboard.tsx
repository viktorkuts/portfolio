import { useEffect, useState } from "react";
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
import { useAuth0 } from "@auth0/auth0-react";
import { AdminProjects } from "@/components/projects/adminprojects";

export function AdminDashboard() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0();
  const { testimonials, refresh } = useDataContext();
  const commentService = useCommentService();

  const [selectedTestimonialFilter, setTestimonialFilter] =
    useState<CommentStatus>(CommentStatus.APPROVED);
  const [pendingTestimonials, setPendingTestimonials] = useState<
    CommentResponse[]
  >([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<
    CommentResponse[] | undefined
  >([]);
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const fetchPendingTestimonials = async () => {
    const pending = await commentService.getPendingTestimonials();
    setPendingTestimonials(pending);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    refresh();
    fetchPendingTestimonials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedTestimonialFilter === CommentStatus.APPROVED) {
      setFilteredTestimonials(testimonials);
    } else {
      setFilteredTestimonials(pendingTestimonials);
    }
  }, [selectedTestimonialFilter, testimonials, pendingTestimonials]);

  const approveComment = async (commentId: string) => {
    await commentService.approveTestimonial(commentId);
    refresh();
    await fetchPendingTestimonials();
    setLoadingIds((prev) => prev.filter((e) => e != commentId));
  };

  const deleteComment = async (commentId: string) => {
    await commentService.deleteTestimonial(commentId);
    refresh();
    await fetchPendingTestimonials();
    setLoadingIds((prev) => prev.filter((e) => e != commentId));
  };

  return (
    <Stack className={style.dashboard}>
      <Title>{t("admin-dashboard")}</Title>
      <AdminProfile />
      <AdminProjects />
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
        />
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
              {filteredTestimonials?.map((t) => (
                <Table.Tr key={t.id}>
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
                            setLoadingIds((prev) => [...prev, t.id]);
                            approveComment(t.id);
                          }}
                          loading={loadingIds.includes(t.id)}
                        >
                          <IconCheck size={16} stroke={1.5} />
                        </ActionIcon>
                      )}
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={() => {
                          setLoadingIds((prev) => [...prev, t.id]);
                          deleteComment(t.id);
                        }}
                        loading={loadingIds.includes(t.id)}
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
