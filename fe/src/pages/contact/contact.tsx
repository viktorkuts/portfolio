import { useMailService } from "@/services/mailService";
import { useUserContext } from "@/utils/userprovider";
import { Button, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const mail = useMailService();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const [content, setContent] = useState<string>("");

  if (!user)
    return (
      <div>
        <Title>Please login to use the emailing feature</Title>
        <Button component="a" href="/auth">
          Login
        </Button>
      </div>
    );

  const sendMail = async () => {
    await mail.sendMail(content);
  };

  return (
    <div>
      <Title>{t("contact-me")}</Title>
      <TextInput
        label="Media"
        value={content}
        onChange={(val) => {
          setContent(val.target.value);
        }}
      ></TextInput>
      <Button
        onClick={() => {
          sendMail();
          alert("Sent to the email associated to this account");
        }}
      >
        Send
      </Button>
    </div>
  );
};
