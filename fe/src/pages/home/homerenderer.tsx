import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Image,
  Space,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDataContext } from "@/utils/dataprovider";
import { useTranslation } from "react-i18next";
import { generateImageUrl } from "@/utils/models/Shared";
import { IconBriefcase, IconNotebook } from "@tabler/icons-react";
import { ProjectResponse } from "@/utils/models/Projects";
import { Key } from "react";

export const HomeRenderer = () => {
  const { t, i18n } = useTranslation();
  const { resume, testimonials } = useDataContext();
  return (
    <div style={{ width: "100%" }}>
      <Container>
        <Title>{t("projects")}</Title>
        <Divider size="sm" w="100%" />
        <Space />
        <Grid p="md" grow gutter="lg" ta="left">
          {resume?.projects.length == 0 && (
            <Card w="100%">
              <Center>{t("no-projects-yet")}</Center>
            </Card>
          )}
          {resume?.projects?.map((project: ProjectResponse, index: Key) => (
            <Grid.Col key={index} span={12}>
              <Card shadow="lg" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Center
                    bg="linear-gradient(#232323, #050505)"
                    h="15vh"
                    mb="lg"
                  >
                    <Avatar
                      variant="gradient"
                      radius="15em"
                      size="7em"
                      src={generateImageUrl(project.image)}
                    >
                      <IconNotebook size={50} />
                    </Avatar>
                  </Center>
                </Card.Section>
                <Title order={2}>{project.name}</Title>
                <Text>
                  {i18n.language == "fr" && project.descriptionFr
                    ? project.descriptionFr
                    : project.description}
                </Text>
                {project.skills.length >= 1 && (
                  <Text mt="lg">{t("links")}</Text>
                )}
                {project.links.map((l, index) => (
                  <Tooltip
                    label={t("view-on-l-label", { value: l.label })}
                    key={index}
                  >
                    <ActionIcon
                      variant="primary"
                      component="a"
                      href={l.url}
                      target="_blank"
                    >
                      <Image w="1.5em" src={generateImageUrl(l.icon)} />
                    </ActionIcon>
                  </Tooltip>
                ))}
                {project.skills.length >= 1 && (
                  <Text mt="lg">{t("technologies-used")}</Text>
                )}
                {project?.skills.map((s) => (
                  <Badge
                    color="black"
                    mb="0.5em"
                    key={s.id}
                    size="xl"
                    leftSection={
                      <Image w="1.5em" src={generateImageUrl(s.icon)} />
                    }
                  >
                    {s.name}
                  </Badge>
                ))}
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      <Container>
        <Title>{t("work-experince")}</Title>
        <Divider size="sm" w="100%" />
        <Space />
        <Grid p="md" grow gutter="lg" ta="left">
          {resume?.works.length == 0 && (
            <Card w="100%">
              <Center>{t("no-work-experience-yet")}</Center>
            </Card>
          )}
          {resume?.works.map((work, index) => (
            <Grid.Col key={index} span={12}>
              <Card shadow="lg" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <Center
                    bg="linear-gradient(#232323, #050505)"
                    h="15vh"
                    mb="lg"
                  >
                    <Avatar
                      variant="gradient"
                      radius="15em"
                      size="7em"
                      src={generateImageUrl(work.image)}
                    >
                      <IconBriefcase size={50} />
                    </Avatar>
                  </Center>
                </Card.Section>
                <Title order={2}>
                  {i18n.language == "fr" && work.positionFr
                    ? work.positionFr
                    : work.position}
                </Title>
                <Text>
                  {t("at")} {work.company.name}
                </Text>
                <Text>
                  {i18n.language == "fr" && work.descriptionFr
                    ? work.descriptionFr
                    : work.description}
                </Text>
                {work.skills.length >= 1 && (
                  <Text mt="lg">{t("technologies-used")}</Text>
                )}
                {work?.skills.map((s) => (
                  <Badge
                    color="black"
                    mb="0.5em"
                    key={s.id}
                    size="xl"
                    leftSection={
                      <Image w="1.5em" src={generateImageUrl(s.icon)} />
                    }
                  >
                    {s.name}
                  </Badge>
                ))}
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
      <Container>
        <Title>{t("testimonials-0")}</Title>
        <Button component="a" href="/testimonial">
          {t("add-testimonial")}
        </Button>
        <Divider size="sm" w="100%" />
        <Space />
        <Grid p="md" gutter="md" ta="left" w="100%">
          {(!testimonials || testimonials.length == 0) && (
            <Card w="100%">
              <Center w="100%">{t("no-testimonials-yet")}</Center>
            </Card>
          )}
          {testimonials?.map((t) => (
            <Grid.Col>
              <Card w="100%">
                <Title order={4}>
                  {t.user.userInfo.firstName} {t.user.userInfo.lastName}
                </Title>
                <Text mb="md">{t.title}</Text>
                <Text>{t.comment}</Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
