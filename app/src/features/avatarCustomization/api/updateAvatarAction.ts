"use server";

import { unstable_update } from "@/auth";
import { Avatar } from "@/entities/avatar";
import { authApi, executeServerAction } from "@/shared/api";
import { ResponseOnboardingStep } from "@/shared/types";

export const uploadAvatarAction = async (body: AvatarUploadBody) =>
  executeServerAction<Avatar>(async () => {
    const formData = new FormData();

    formData.append("file", body.avatar);
    formData.append("posX", body.posX);
    formData.append("posY", body.posY);
    formData.append("scale", body.scale);

    const api = await authApi();

    const res = await api.post<Avatar, FormData>("users/avatar", formData);

    if (res.data) {
      await unstable_update({
        user: {
          onboardingStep: ResponseOnboardingStep.REGISTERED,
          avatar: {
            posX: res.data.posX,
            posY: res.data.posY,
            scale: res.data.scale,
            url: res.data.url,
          },
        },
      });
    }

    return res.data;
  });

export type AvatarUploadBody = {
  posX: string;
  posY: string;
  scale: string;
  avatar: File;
};
