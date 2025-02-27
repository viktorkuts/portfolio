import { useEffect, useState } from "react";
import {
  Badge,
  Burger,
  Button,
  Container,
  Group,
  Stack,
  Transition,
} from "@mantine/core";
import {
  useDebouncedCallback,
  useDebouncedState,
  useDisclosure,
} from "@mantine/hooks";
import classes from "./navbar.module.css";
import { IconWorld } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from "@/utils/userprovider";
import { UserType } from "@/utils/models/User";

export function Navbar() {
  const { i18n, t } = useTranslation();
  const { isAuthenticated } = useAuth0();
  const { user } = useUserContext();

  const links = [
    { link: "/", label: t("home") },
    { link: "/contact", label: t("contact") },
    ...(user?.type === UserType.USER
      ? [{ link: "/admin", label: t("admin") }]
      : []),
    // ...(isAuthenticated
    //   ? [{ link: "/user-profile", label: t("user-profile") }]
    //   : []),
    { link: "/auth", label: isAuthenticated ? t("logout") : t("login") },
  ];

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const navigate = useNavigate();

  const debouncedToggle = useDebouncedCallback(() => {
    toggle();
  }, 50);

  const debouncedOpened = useDebouncedState(opened, 100);

  const [isEnglish, setIsEnglish] = useState<boolean>();

  useEffect(() => {
    i18n.changeLanguage(isEnglish ? "en" : "fr");
  }, [i18n, isEnglish]);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        if (link.link == "/auth") {
          navigate(link.link, { replace: true });
          return;
        }
        setActive(link.link);
        navigate(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <p>Viktor Kuts</p>
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
          <Button
            onClick={() => {
              setIsEnglish((val) => !val);
            }}
          >
            <Badge>{isEnglish ? "FR" : "EN"}</Badge>
            <IconWorld></IconWorld>
          </Button>
          <Burger
            opened={opened}
            onClick={debouncedToggle}
            hiddenFrom="xs"
            size="sm"
          />
        </Container>
        <Transition
          mounted={opened}
          transition="fade-up"
          duration={400}
          timingFunction="ease"
        >
          {(styles) => (
            <Container
              style={styles}
              className={classes.openburgerdropdown}
              hiddenFrom="xs"
              hidden={!debouncedOpened}
            >
              <Stack>{items}</Stack>
            </Container>
          )}
        </Transition>
      </header>
    </>
  );
}
