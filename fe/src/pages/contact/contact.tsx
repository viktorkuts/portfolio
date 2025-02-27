import { useMailService } from "@/services/mailService";
import { useDataContext } from "@/utils/dataprovider";
import { useUserContext } from "@/utils/userprovider";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, Container, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const mail = useMailService();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { isAuthenticated } = useAuth0();
  const [content, setContent] = useState<string>("");
  const { resume } = useDataContext();

  if (!isAuthenticated)
    return (
      <div>
        <Title>{t("please-login-to-use-the-emailing-feature")}</Title>
        <Button component="a" href="/auth">
          {t("login-0")}
        </Button>
      </div>
    );

  if (!user)
    return (
      <div>
        <Title>
          {t("please-register-user-info-to-use-the-emailing-feature")}
        </Title>
        <Button component="a" href="/profile-registration">
          {t("register")}
        </Button>
      </div>
    );

  const sendMail = async () => {
    await mail.sendMail(content);
  };

  return (
    <Container w="100%">
      <Title>{t("contact-me")}</Title>
      <Card>
        <Text>
          {t("feel-free-to-reach-out-to-my-email-at")}{" "}
          <strong>{resume?.user.email}</strong>
          {t("you-can-use-the-e-mail-below-to-send-yourself-a-message")}
        </Text>
        <TextInput
          label={t("content")}
          value={content}
          onChange={(val) => {
            setContent(val.target.value);
          }}
        ></TextInput>
        <Button
          mt="lg"
          onClick={() => {
            sendMail();
            alert("Sent to the email associated to this account");
          }}
        >
          {t("send")}
        </Button>
      </Card>
    </Container>
  );
};
