import { ReactElement } from "react";
import styles from "./home.module.css";
import { Avatar, Card, Skeleton, Spoiler, Title } from "@mantine/core";
import { useDataContext } from "@/utils/dataprovider";

type Props = {
  children: ReactElement;
};

export const Home = ({ children }: Props) => {
  const { resume, testimonials, isLoading } = useDataContext();
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
            <Avatar radius="15em" size="15em" src={resume?.avatar} />
            <Title>
              {resume?.user?.firstName} {resume?.user?.lastName}
            </Title>
            <Title order={2}>{resume?.title}</Title>
            <Spoiler maxHeight={50} showLabel="Read more" hideLabel="Hide">
              {resume?.description}
            </Spoiler>
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
