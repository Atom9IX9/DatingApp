import { Avatar } from "@/entities/avatar";
import { baseAPI } from "@/shared/api";

export const loginEndpoint = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation<Avatar, AvatarUploadBody>({
      query: (body) => {
        const formData = new FormData();
        formData.append("file", body.avatar);
        formData.append("posX", body.posX);
        formData.append("posY", body.posY);
        formData.append("scale", body.scale);

        return {
          url: "users/avatar",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadAvatarMutation } = loginEndpoint;
// Exported type alias used for typing shared data shapes.
export type AvatarUploadBody = {
  posX: string;
  posY: string;
  scale: string;
  avatar: File;
};
