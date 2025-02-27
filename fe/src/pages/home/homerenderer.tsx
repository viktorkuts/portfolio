import {
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
} from "@mantine/core";
import { useDataContext } from "@/utils/dataprovider";
import { useTranslation } from "react-i18next";
import { generateImageUrl } from "@/utils/models/Shared";
import { IconBriefcase } from "@tabler/icons-react";

export const HomeRenderer = () => {
  const { t, i18n } = useTranslation();
  const { resume, testimonials } = useDataContext();
  return (
    <div style={{ width: "100%" }}>
      <Container>
        <Title>{t("work-experince")}</Title>
        <Divider size="sm" w="100%" />
        <Space />
        <Grid p="md" grow gutter="lg" ta="left">
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
        <Grid p="md" grow gutter="lg" ta="left" w="100%">
          {(!testimonials || testimonials.length == 0) && (
            <Card w="100%">
              <Center w="100%">{t("no-testimonials-yet")}</Center>
            </Card>
          )}
          {testimonials?.map((t) => (
            <Card w="100%">
              <Card.Section>
                <Text>
                  {t.user.userInfo.firstName} {t.user.userInfo.lastName}
                </Text>
                <Text>{t.title}</Text>
              </Card.Section>
              <Title>{t.comment}</Title>
            </Card>
          ))}
        </Grid>
      </Container>
      {/* <Container h="calc(100vh - 56px)">
        <Title>Projects</Title>
        <Divider size="sm" w="100%" />
        <Space />
        <Grid p="md" grow gutter="lg" ta="left">
          {resume?.works.map((work, index) => (
            <Grid.Col key={index} span={isMobile ? 12 : 2}>
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
                <Title order={2}>{work.position}</Title>
                <Text>At {work.company.name}</Text>
                <Text mb="lg">
                  {work?.functionStart?.toDateString()}{" "}
                  {work?.functionEnd?.toDateString() || "Present"}
                </Text>
                <Text>{work.description}</Text>
                {work.skills.length >= 1 && (
                  <Text mt="lg">Technologies used:</Text>
                )}
                {work?.skills.map((s) => (
                  <Badge
                    key={s.id}
                    size="xl"
                    leftSection={
                      <Image w="2em" src={generateImageUrl(s.icon)} />
                    }
                  >
                    {s.name}
                  </Badge>
                ))}
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container> */}
    </div>
  );
  // return (
  //   <Stack w="100%" justify="center">
  //     <Card className={style.card}>
  //       <Title>{t("work-experience")}</Title>
  //       <Divider size="sm" w="100%" />
  //       <Accordion defaultValue={t("no-work-experience-yet")} w="100%">
  //         {(!resume || !resume?.works || resume.works.length < 1) && (
  //           <Title order={5}>{t("no-work-experience-yet")}</Title>
  //         )}
  //         {resume?.works.map((work, index) => (
  //           <Accordion.Item key={index} value={work?.position}>
  //             <Accordion.Control>
  //               <Group wrap="nowrap">
  //                 <div>
  //                   <Text>{work.position}</Text>
  //                   <Text size="sm" c="dimmed" fw={400}>
  //                     {work?.company?.name}
  //                   </Text>
  //                 </div>
  //               </Group>
  //             </Accordion.Control>
  //             <Accordion.Panel>{work.description}</Accordion.Panel>
  //           </Accordion.Item>
  //         ))}
  //       </Accordion>
  //     </Card>
  //     <Card className={style.card}>
  //       <Title>{t("projects")}</Title>
  //       <Divider size="sm" w="100%" />
  //       {(!resume || resume.works.length < 1) && (
  //         <Title order={5}>{t("no-projects-yet")}</Title>
  //       )}
  //     </Card>
  //     <Card className={style.card}>
  //       <Title>{t("testimonials")}</Title>
  //       <Button component="a" href="/testimonial">
  //         {t("add-testimonial")}
  //       </Button>
  //       <Divider size="sm" w="100%" />
  //       {!testimonials || testimonials?.length < 1 ? (
  //         <Title order={5}>{t("no-public-testimonials-yet")}</Title>
  //       ) : (
  //         <Stack w="100%">
  //           {testimonials?.map((testimonial) => (
  //             <Card w="100%">
  //               <Title order={5}>
  //                 {testimonial.user.userInfo.firstName}{" "}
  //                 {testimonial.user.userInfo.lastName}
  //               </Title>
  //               <Text>{testimonial.title}</Text>
  //               <Text>{testimonial.comment}</Text>
  //             </Card>
  //           ))}
  //         </Stack>
  //       )}
  //     </Card>
  //   </Stack>
  // );
};
