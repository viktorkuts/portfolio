import {
  Alert,
  Button,
  Card,
  Container,
  LoadingOverlay,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

import style from "./profileregister.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { useUserService } from "@/services/userService";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { useUserContext } from "@/utils/userprovider";
import { useAuth0 } from "@auth0/auth0-react";
import { UserInfo } from "@/utils/models/User";

export const ProfileRegister = () => {
  const userService = useUserService();
  const { user, refresh } = useUserContext();
  const { isAuthenticated } = useAuth0();
  const nav = useNavigate();
  const [visible, { close, open }] = useDisclosure(false);
  const { t } = useTranslation();
  const [error, setError] = useState<string>("");
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : t("invalid-email"),
    },
  });

  const submit = (val: UserInfo) => {
    const send = async () => {
      try {
        open();
        await userService.registerProfile(val);
        nav("/");
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(`There was an error: ${e.response?.data.message}`);
        } else {
          setError(
            `There was an unexpected error, please try again later: ${e}`
          );
        }
      } finally {
        close();
        refresh();
      }
    };
    send();
  };

  useEffect(() => {
    if (!isAuthenticated) nav("/auth");
    if (user) nav("/");
  }, [nav, user, isAuthenticated]);

  return (
    <Container w="100%">
      <Title>{t("profile-registration")}</Title>
      <Text>
        {t(
          "you-need-to-fill-out-some-information-before-you-are-able-to-post-testimonials-or-send-email"
        )}
      </Text>
      <Card
        className={style.card}
        pos="relative"
        component="form"
        onSubmit={form.onSubmit(submit)}
      >
        <Alert variant="light" color="red" title="Error" hidden={error == ""}>
          {error}
        </Alert>
        <LoadingOverlay
          visible={visible}
          zIndex={10000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <TextInput
          label={t("first-name")}
          placeholder="John"
          key={form.key("firstName")}
          {...form.getInputProps("firstName")}
        />
        <TextInput
          label={t("last-name")}
          placeholder="Doe"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />
        <TextInput
          label="E-Mail"
          placeholder="john.doe@example.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
          type="email"
        />

        <Button type="submit" mt="md">
          {t("submit")}
        </Button>
      </Card>
    </Container>
  );
};
