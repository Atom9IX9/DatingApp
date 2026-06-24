import { useRef, useState } from "react";

// Custom hook that handles AvatarEdit logic.
export const useAvatarEdit = (transforms?: Transform) => {
  // React state storing isLandscape values and updating them with IsLandscape.
  const [isLandscape, setIsLandscape] = useState(false);
  // React state storing scaleValue values and updating them with ScaleValue.
  const [scaleValue, setScaleValue] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // React ref storing a DOM element reference between renders.
  const positionRef = useRef({ x: 0, y: 0 });
  // React state storing position values and updating them with Position.
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // React ref storing a DOM element reference between renders.
  const start = useRef({ x: 0, y: 0 });

  // React ref storing a DOM element reference between renders.
  const dragging = useRef(false);

  const applyTransform = (x: number, y: number, scale: number) => {
    if (!imgRef.current) return;

    imgRef.current.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  };

  // Setter helper that updates values or state for imgposition.
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

    // Compute the current image width after scaling.
    const imgWidth = imgRef.current.offsetWidth * scale;
    // Compute the current image height after scaling.
    const imgHeight = imgRef.current.offsetHeight * scale;

    // Compute the minimum translation bound so the image stays inside the frame.
    const minX = containerRect.width - imgWidth;
    // Compute the minimum translation bound so the image stays inside the frame.
    const minY = containerRect.height - imgHeight;

    // Clamp dragged coordinates so the image cannot move outside the container.
    const x = Math.min(0, Math.max(minX, newX));
    // Clamp dragged coordinates so the image cannot move outside the container.
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
