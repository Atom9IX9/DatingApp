
"use client"
import { useDragAndDrop } from "@/shared/lib";
import { Box, Button } from "@mui/material";
import {
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { BaseBtn, VisuallyHiddenInput } from "@/shared/ui";
import AvatarEditForm, { onUploadSubmit } from "./AvatarEditForm";
import { getFileUrl } from "../lib/setFileUrl";
import { useUploadAvatarMutation } from "../api/avatarApi";
import { Avatar } from "@/entities/avatar";
// Form component that captures upload input.
const UploadForm: React.FC<Props> = ({ onSuccess }) => {
  const dropAreaRef = useRef<HTMLDivElement | null>(null);
  const { file, isDragging, resetFile, error } = useDragAndDrop(
    ["image/png", "image/jpeg", "image/webp"],
    dropAreaRef,
  );

  const [selectedFile, setSelectedFile] = useState<File>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [uploadAvatar, result] = useUploadAvatarMutation();

  const onSubmit: onUploadSubmit = (data) => {
    if (selectedFile) {
      uploadAvatar({
        avatar: selectedFile,
        posX: String(data.posX),
        posY: String(data.posY),
        scale: String(data.scale),
      });
    }
  };

  const selectFile = (file?: File) => {
    setSelectedFile(file);
    setAvatarUrl(getFileUrl(file) as string);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    selectFile(e.target.files ? e.target.files[0] : undefined);
  };

  useEffect(() => {
    if (file) {
      selectFile(file);
    }
  }, [file, setSelectedFile]);

  useEffect(() => {
    if (result.data && onSuccess) {
      onSuccess(result.data);
    }
  }, [result.data]);

// Render the component's JSX structure.
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        component={"h4"}
        sx={{
          mb: "17px",
          fontSize: "20px",
          fontWeight: 500,
        }}
      >
        Add profile photo
      </Box>
      {!selectedFile ? (
        <Box
          ref={dropAreaRef}
          sx={(theme) => ({
            display: "block",
            position: "relative",
            width: "260px",
            height: "260px",
            border: !isDragging
              ? "2px dashed #ffffff66"
              : `2px dashed ${theme.palette.secondary.main}`,

            bgcolor: "transparent",
            backgroundImage: isDragging
              ? `repeating-linear-gradient( -45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.main} 5px, transparent 5px, transparent 25px )`
              : "none",
          })}
        >
          <UploadIcon
            color="secondary"
            sx={{
              width: 92,
              height: 92,
              margin: "38px 84px 0",
              pointerEvents: "none",
            }}
          />
          <Box
            component="p"
            sx={{ textAlign: "center", fontWeight: 200, pointerEvents: "none" }}
          >
            Drop files to upload
          </Box>
          {error && (
            <Box
              sx={{
                pointerEvents: "none",
                textAlign: "center",
                color: "error.main",
                mt: 2,
              }}
            >
              {error}
            </Box>
          )}

          <Button
            component="label"
            variant="contained"
            color="info"
            sx={(theme) => ({
              width: 152,
              height: 27,
              boxShadow: "none",
              position: "absolute",
              bottom: "31px",
              left: "54px",
              textTransform: "none",
              "&:hover": {
                boxShadow: "none",
                backgroundColor: theme.palette.info.light,
              },
              pointerEvents: isDragging ? "none" : "auto",
            })}
          >
            Browse
            <VisuallyHiddenInput
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      ) : (
        <AvatarEditForm avatarUrl={avatarUrl as string} onSubmit={onSubmit} />
      )}
      {!selectedFile && (
        <Box sx={{ width: "100%", mt: "100px" }}>
          <BaseBtn variant="contained" disabled>
            SAVE
          </BaseBtn>
        </Box>
      )}
    </Box>
  );
};

// Form component that captures upload input.
export default UploadForm;
// Exported type alias used for typing shared data shapes.
export type Props = {
  onSuccess?: (data: Avatar) => void;
};
