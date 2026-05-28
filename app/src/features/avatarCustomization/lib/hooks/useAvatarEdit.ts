import { useRef, useState } from "react";

export const useAvatarEdit = (transforms?: Transform) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [scaleValue, setScaleValue] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const pos = useRef({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });
  const imgSizes = useRef({ w: 0, h: 0 });

  if (transforms && imgRef.current) {
    // for x*x
    //todo: global coords system refactor
    const k = containerRef.current ? containerRef.current.clientWidth / 260 : 1;

    pos.current = { x: transforms.posX, y: transforms.posY };
    const posX =
      (transforms.posX / transforms.scale) * k +
      0.1 * (transforms.posX / transforms.scale) * k;
    const posY =
      (transforms.posY / transforms.scale) * k +
      0.1 * (transforms.posY / transforms.scale) * k;
    if (containerRef.current) {
      imgRef.current.style.transform = `
      scale(${transforms.scale + 0.6})
      translate(${posX}px, ${posY}px)
    `;
    }
  }

  const dragging = useRef(false);

  const clampPosition = (
    x: number,
    y: number,
    renderedWidth: number,
    renderedHeight: number,
    containerWidth: number,
    containerHeight: number,
  ) => {
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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsLandscape(img.naturalWidth >= img.naturalHeight);
    if (containerRef.current) {
      imgSizes.current = {
        w: img.naturalWidth * (containerRef.current?.clientWidth / 260),
        h: img.naturalHeight * (containerRef.current?.clientHeight / 260),
      };
    } else {
      imgSizes.current = {
        w: img.naturalWidth,
        h: img.naturalHeight,
      };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;

    start.current = {
      x: e.clientX - pos.current.x,
      y: e.clientY - pos.current.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current || !imgRef.current) return;

    const container = containerRef.current.getBoundingClientRect();

    const { w: naturalWidth, h: naturalHeight } = imgSizes.current;

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

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleScale = (e: Event, newValue: number | number[]) => {
    const scale = newValue as number;

    setScaleValue(scale);

    pos.current.x /= scale;
    pos.current.y /= scale;

    if (!imgRef.current) return;

    imgRef.current.style.transform = `
  scale(${scaleValue})
  translate(${pos.current.x / scaleValue}px, ${pos.current.y / scaleValue}px)
`;
  };

  return {
    refs: { containerRef, imgRef },
    handlers: {
      handleImageLoad,
      handleScale,
      handleMouseUp,
      handleMouseMove,
      handleMouseDown,
    },
    state: {
      isLandscape,
      scaleValue,
      position: pos,
    },
  };
};

type Transform = {
  posX: number;
  posY: number;
  scale: number;
};
