import { ReactElement } from "react";
import styles from "./home.module.css";
import {
  Avatar,
  Button,
  Card,
  Group,
  Image,
  Skeleton,
  Spoiler,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDataContext } from "@/utils/dataprovider";
import { generateImageUrl } from "@/utils/models/Shared";
import { useTranslation } from "react-i18next";
import { IconDownload } from "@tabler/icons-react";

type Props = {
  children: ReactElement;
};

export const Home = ({ children }: Props) => {
  const { resume, testimonials, isLoading } = useDataContext();
  const { i18n } = useTranslation();
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        {isLoading || !resume || !testimonials ? (
          <>
            <Skeleton height={150} circle mb="xl" />
            <Skeleton height={8} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} width="70%" radius="xl" />
          </>
        ) : (
          <>
            <Avatar
              radius="15em"
              size="15em"
              src={generateImageUrl(resume?.avatar)}
              mb="lg"
            />
            <Title>
              {resume?.user?.firstName} {resume?.user?.lastName}
            </Title>
            <Title order={2}>
              {i18n.language == "fr" && resume.titleFr
                ? resume.titleFr
                : resume.title}
            </Title>
            <Spoiler
              maxHeight={50}
              showLabel="Read more"
              hideLabel="Hide"
              mb="xl"
            >
              {i18n.language == "fr" && resume.descriptionFr
                ? resume.descriptionFr
                : resume.description}
            </Spoiler>
            <Button
              component="a"
              href={`${import.meta.env.VITE_MINIO_URL}/${import.meta.env.VITE_MINIO_BUCKET}/CV-int${i18n.language == "fr" ? "-french" : ""}.pdf`}
              target="_blank"
              rightSection={<IconDownload size={20} />}
              mb="lg"
            >
              CV
            </Button>
            <Group mb="md">
              {resume?.links?.map((l, index) => (
                <Tooltip label={l.label} key={index}>
                  <a href={l.url} target="_blank">
                    <Image w="3em" src={generateImageUrl(l.icon)} />
                  </a>
                </Tooltip>
              ))}
            </Group>
          </>
        )}
      </aside>
      <main className={styles.content}>
        {isLoading || !resume || !testimonials
          ? new Array(7).fill("").map((_, index) => (
              <Card w="100%" mt={10} h={100} key={index}>
                <Skeleton height={20} mt={6} radius="xl" />
                <Skeleton height={8} mt={20} width="70%" radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
              </Card>
            ))
          : children}
      </main>
    </div>
  );
};
