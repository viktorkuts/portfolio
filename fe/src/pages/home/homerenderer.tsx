import {
  Accordion,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDataContext } from "@/utils/dataprovider";
import style from "./homerenderer.module.css";

export const HomeRenderer = () => {
  const { resume, testimonials } = useDataContext();
  return (
    <Stack w="100%">
      <Card className={style.card}>
        <Title>Work Experience</Title>
        <Divider size="sm" w="100%" />
        <Accordion defaultValue="No work experience" w="100%">
          {(!resume || resume?.works || resume.works.length < 1) && (
            <Title order={5}>No work experience yet!</Title>
          )}
          {resume?.works.map((work, index) => (
            <Accordion.Item key={index} value={work?.position}>
              <Accordion.Control>
                <Group wrap="nowrap">
                  <div>
                    <Text>{work.position}</Text>
                    <Text size="sm" c="dimmed" fw={400}>
                      {work?.company?.name}
                    </Text>
                  </div>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>{work.description}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
      <Card className={style.card}>
        <Title>Projects</Title>
        <Divider size="sm" w="100%" />
        {(!resume || resume.works.length < 1) && (
          <Title order={5}>No projects yet!</Title>
        )}
      </Card>
      <Card className={style.card}>
        <Title>Testimonials</Title>
        <Button component="a" href="/testimonial">
          Add Testimonial
        </Button>
        <Divider size="sm" w="100%" />
        {!testimonials || testimonials?.length < 1 ? (
          <Title order={5}>No public testimonials yet!</Title>
        ) : (
          <Stack w="100%">
            {testimonials?.map((testimonial) => (
              <Card w="100%">
                <Title order={5}>
                  {testimonial.user.userInfo.firstName}{" "}
                  {testimonial.user.userInfo.lastName}
                </Title>
                <Text>{testimonial.title}</Text>
                <Text>{testimonial.comment}</Text>
              </Card>
            ))}
          </Stack>
        )}
      </Card>
    </Stack>
  );
};
