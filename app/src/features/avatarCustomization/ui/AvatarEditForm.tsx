"use client";

import { Box, Slider } from "@mui/material";
import { FC } from "react";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";
import { useAvatarEdit } from "../lib/hooks/useAvatarEdit";

const AvatarEditForm: FC<Props> = ({ avatarUrl }) => {
  const { refs, handlers, state } = useAvatarEdit();

  return (
    <Box>
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
            transition: "transform 100ms ease",
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
            gap: "5px",
          }}
        >
          <Box>drag to move</Box>
          <OpenWithOutlinedIcon fontSize="small" />
        </Box>
      </Box>
      <Box component={"label"} sx={{ mt: "16px" }}>
        <Box
          sx={{
            fontSize: 14,
            textAlign: "center",
            fontWeight: 600,
            mt: "10px",
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
          {(state.scaleValue).toFixed(1)}
        </Box>
      </Box>
    </Box>
  );
};

export default AvatarEditForm;
type Props = {
  avatarUrl: string;
};
