"use client";

import { Box, Slider } from "@mui/material";
import { FC, useRef, useState } from "react";
import OpenWithOutlinedIcon from "@mui/icons-material/OpenWithOutlined";

type Props = {
  avatarUrl: string;
};

const AvatarEditForm: FC<Props> = ({ avatarUrl }) => {
  const clampPosition = (
    x: number,
    y: number,
    renderedWidth: number,
    renderedHeight: number,
    containerWidth: number,
    containerHeight: number,
  ) => {
    /*
    if image bigger than container:
    allow drag until edges touch

    if image smaller:
    keep centered / locked
  */

    let minX: number;
    let maxX: number;

    let minY: number;
    let maxY: number;

    if (renderedWidth > containerWidth) {
      minX = containerWidth - renderedWidth + renderedWidth * 0.015;
      maxX = 0;
    } else {
      minX = maxX = (containerWidth - renderedWidth) / 2;
    }

    if (renderedHeight > containerHeight) {
      minY = containerHeight - renderedHeight + renderedHeight * 0.015;
      maxY = 0;
    } else {
      minY = maxY = (containerHeight - renderedHeight) / 2;
    }

    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    };
  };

  const [isLandscape, setIsLandscape] = useState(false);
  const [scaleValue, setScaleValue] = useState(1);
  const naturalSizes = useRef({ w: 0, h: 0 });

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsLandscape(img.naturalWidth >= img.naturalHeight);
    naturalSizes.current = { w: img.naturalWidth, h: img.naturalHeight };
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;

    start.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current || !imgRef.current) return;

    const container = containerRef.current.getBoundingClientRect();

    const { w: naturalWidth, h: naturalHeight } = naturalSizes.current;

    let renderedWidth = 0;
    let renderedHeight = 0;

    if (isLandscape) {
      renderedHeight = container.height;
      renderedWidth = (naturalWidth / naturalHeight) * container.height;
    } else {
      renderedWidth = container.width;
      renderedHeight = (naturalHeight / naturalWidth) * container.width;
    }

    renderedWidth *= scaleValue;
    renderedHeight *= scaleValue;

    let x = e.clientX - start.current.x;
    let y = e.clientY - start.current.y;

    const clamped = clampPosition(
      x,
      y,
      renderedWidth,
      renderedHeight,
      container.width,
      container.height,
    );

    pos.current = clamped;

    imgRef.current.style.transform = `
  scale(${scaleValue})
  translate(${clamped.x / scaleValue}px, ${clamped.y / scaleValue}px)
`;
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  return (
    <Box>
      <Box
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
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
          ref={imgRef}
          src={avatarUrl}
          alt="avatar"
          draggable={false}
          onLoad={handleLoad}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: isLandscape ? "auto" : "100%",
            height: isLandscape ? "100%" : "auto",
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
          value={scaleValue}
          onChange={(e, newValue) => {
            const scale = newValue as number;

            setScaleValue(scale);

            pos.current.x /= scale;
            pos.current.y /= scale;

            if (!imgRef.current) return;

            imgRef.current.style.transform = `
  scale(${scaleValue})
  translate(${pos.current.x / scaleValue}px, ${pos.current.y / scaleValue}px)
`;
          }}
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
          {(scaleValue - 1).toFixed(1)}
        </Box>
      </Box>
    </Box>
  );
};

export default AvatarEditForm;
