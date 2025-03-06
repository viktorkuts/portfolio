import { useCommentService } from "@/services/commentService";
import { useUserContext } from "@/utils/userprovider";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Card,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export const TestimonialForm = () => {
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { isAuthenticated } = useAuth0();
  const commentService = useCommentService();
  const nav = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const submit = async () => {
    await commentService.addTestimonial({
      title,
      comment,
    });
  };

  const submitTestimonial = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    submit();
    window.alert(
      t("testimonial-submitted-will-be-reviewed-and-approved-shortly")
    );
    nav("/");
  };

  if (!isAuthenticated)
    return (
      <Container>
        <Title>{t("please-login-before-leaving-testimonial1")}</Title>
        <Button component="a" href="/auth">
          {t("login-0")}
        </Button>
      </Container>
    );

  if (!user)
    return (
      <div>
        <Title>
          {t("please-register-user-info-to-use-the-testimonial-feature")}
        </Title>
        <Button component="a" href="/profile-registration">
          {t("register")}
        </Button>
      </div>
    );

  return (
    <Container w="100%" component="form" onSubmit={submitTestimonial}>
      <Title>{t("leave-a-testimonial")}</Title>
      <Card>
        <Stack>
          <TextInput
            label={t("your-title-position")}
            placeholder={t("executive-at-bigcorp")}
            value={title}
            onChange={(va) => {
              setTitle(va.target.value);
            }}
          ></TextInput>
          <TextInput
            label={t("your-comment")}
            placeholder={t("hes-good")}
            value={comment}
            onChange={(va) => {
              setComment(va.target.value);
            }}
          ></TextInput>
          <Button type="submit">{t("submit")}</Button>
        </Stack>
      </Card>
    </Container>
  );
};
