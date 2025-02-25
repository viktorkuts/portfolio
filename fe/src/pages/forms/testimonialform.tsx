import { useCommentService } from "@/services/commentService";
import { useUserContext } from "@/utils/userprovider";
import {
  Button,
  Card,
  Container,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";

export const TestimonialForm = () => {
  const { user } = useUserContext();
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
      "Testimonial submitted, will be reviewed and approved shortly"
    );
    nav("/");
  };

  if (!user)
    return (
      <Container>
        <Title>Please login before leaving testimonial1</Title>
        <Button component="a" href="/auth">
          Login
        </Button>
      </Container>
    );

  return (
    <Container w="100%" component="form" onSubmit={submitTestimonial}>
      <Title>Leave a Testimonial</Title>
      <Card>
        <Stack>
          <TextInput
            label="Your title/position"
            placeholder="Executive at BigCorp"
            value={title}
            onChange={(va) => {
              setTitle(va.target.value);
            }}
          ></TextInput>
          <TextInput
            label="Your comment"
            placeholder="He's good"
            value={comment}
            onChange={(va) => {
              setComment(va.target.value);
            }}
          ></TextInput>
          <Button type="submit">Submit</Button>
        </Stack>
      </Card>
    </Container>
  );
};
