import { useRef, useState } from "react";

export const useAvatarEdit = (transforms?: Transform) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const [scaleValue, setScaleValue] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const positionRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const start = useRef({ x: 0, y: 0 });

  const dragging = useRef(false);

  const applyTransform = (x: number, y: number, scale: number) => {
    if (!imgRef.current) return;

    imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  };

  const setImgPosition = (x: number, y: number) => {
    positionRef.current = { x, y };
    setPosition({ x, y });
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsLandscape(img.naturalWidth >= img.naturalHeight);
    if (transforms && containerRef.current) {
      applyTransform(transforms.x, transforms.y, transforms.scale);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;

    start.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current || !imgRef.current) return;
    imgRef.current.style.transition = "transform 0ms ease";

    const containerRect = containerRef.current.getBoundingClientRect();

    const scale = scaleValue;

    const newX = e.clientX - start.current.x;
    const newY = e.clientY - start.current.y;

    const imgWidth = imgRef.current.offsetWidth * scale;
    const imgHeight = imgRef.current.offsetHeight * scale;

    const minX = containerRect.width - imgWidth;
    const minY = containerRect.height - imgHeight;

    const x = Math.min(0, Math.max(minX, newX));
    const y = Math.min(0, Math.max(minY, newY));

    setImgPosition(x, y);
    applyTransform(x, y, scale);
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleScale = (e: Event, newValue: number | number[]) => {
    const scale = newValue as number;

    if (!dragging.current && imgRef.current) {
      imgRef.current.style.transition = "transform 300ms ease";
    }

    setScaleValue(scale);

    applyTransform(0, 0, scale);
    setImgPosition(0, 0);
  };

  return {
    refs: { containerRef, imgRef },
    handlers: {
      handleImageLoad,
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleScale,
    },
    state: {
      isLandscape,
      scaleValue,
      position,
    },
  };
};

type Transform = {
  scale: number;
  x: number;
  y: number;
};
