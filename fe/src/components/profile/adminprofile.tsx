import { useImageService } from "@/services/imageService";
import { useResumeService } from "@/services/resumeService";
import { useDataContext } from "@/utils/dataprovider";
import { PatchInfo } from "@/utils/models/ResumeModel";
import { generateImageUrl } from "@/utils/models/Shared";
import {
  Button,
  Card,
  FileInput,
  Image,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const AdminProfile = () => {
  const imageService = useImageService();
  const { t } = useTranslation();
  const resumeService = useResumeService();
  const patchInfo = async (req: PatchInfo) => {
    await resumeService.patchInfo(req);
  };
  const { resume, refresh } = useDataContext();
  const [userTitle, setUserTitle] = useState<string>(resume?.title || "");
  const [userDescription, setUserDescription] = useState<string>(
    resume?.description || ""
  );

  const [img, setImg] = useState<File | null>(null);

  const uploadImageBlob = async () => {
    if (!img || !resume?.avatar.id) return;
    await imageService.updateImage(resume?.avatar.id, img);
    setImg(null);
    refresh();
  };

  return (
    <Card>
      <Title>{t("profile")}</Title>
      <Stack>
        <Image w="10em" src={generateImageUrl(resume?.avatar)} />
        <FileInput value={img} onChange={setImg} />
        {img && <Button onClick={uploadImageBlob}>Upload</Button>}
        <TextInput
          label={t("title")}
          value={userTitle}
          onChange={(val) => {
            setUserTitle(val.target.value);
          }}
        ></TextInput>
        <TextInput
          label={t("description")}
          value={userDescription}
          onChange={(val) => {
            setUserDescription(val.target.value);
          }}
        ></TextInput>
        <Button
          onClick={() => {
            patchInfo({
              description: userDescription,
              title: userTitle,
            });
            refresh();
          }}
        >
          {t("save")}
        </Button>
      </Stack>
    </Card>
  );
};
