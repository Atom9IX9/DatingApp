
"use client";

import { Box, Slider } from "@mui/material";
import { FC, MouseEventHandler } from "react";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";

import { useAvatarEdit } from "@/entities/avatar";
import { BaseBtn } from "@/shared/ui";

// Form component that captures avatar edit input.
const AvatarEditForm: FC<Props> = ({ avatarUrl, onSubmit }) => {
  const { refs, handlers, state } = useAvatarEdit();

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (onSubmit) {
      onSubmit({
        posX: state.position.x,
        posY: state.position.y,
        scale: state.scaleValue,
      });
    }
  };

// Render the component's JSX structure.
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        ref={refs.containerRef}
        onMouseDown={handlers.handleMouseDown}
        onMouseMove={handlers.handleMouseMove}
        onMouseUp={handlers.handleMouseUp}
        onMouseLeave={handlers.handleMouseUp}
        sx={{
          width: 260,
          height: 260,
          position: "relative",
          overflow: "hidden",
          border: "2px solid #ffffff67",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        <Box
          component="img"
          ref={refs.imgRef}
          src={avatarUrl}
          alt="avatar"
          draggable={false}
          onLoad={handlers.handleImageLoad}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: state.isLandscape ? "auto" : "100%",
            height: state.isLandscape ? "100%" : "auto",
            transformOrigin: "top left",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            border: "80px solid #0000008e",
            boxSizing: "border-box",
            width: 374,
            height: 374,
            borderRadius: "100%",
            position: "absolute",
            left: "-57px",
            top: "-57px",
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            color: "#999999",
            bottom: 4,
            left: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <Box>drag to move</Box>
          <OpenWithOutlinedIcon fontSize="small" />
        </Box>
      </Box>
      <Box
        component={"label"}
        sx={{ mt: "20px", display: "block", width: 260 }}
      >
        <Box
          sx={{
            fontSize: 14,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Scale
        </Box>
        <Slider
          color="secondary"
          aria-label="Scale"
          value={state.scaleValue}
          onChange={handlers.handleScale}
          min={1}
          max={3}
          step={0.1}
          sx={{
            "& .MuiSlider-thumb": {
              width: 15,
              height: 15,
            },
          }}
        />
        <Box
          sx={{
            fontSize: 11,
            textAlign: "center",
            fontWeight: 400,
            mt: "2px",
          }}
        >
          {state.scaleValue.toFixed(1)}
        </Box>
      </Box>
      <Box sx={{ width: "100%", mt: "24px" }}>
        <BaseBtn
          type="submit"
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          SAVE
        </BaseBtn>
      </Box>
    </Box>
  );
};

// Form component that captures avatar edit input.
export default AvatarEditForm;
// Type describing component props.
type Props = {
  avatarUrl: string;
  onSubmit?: onUploadSubmit;
};

// Exported type alias used for typing shared data shapes.
export type onUploadSubmit = (data: {
  posX: number;
  posY: number;
  scale: number;
}) => void;
