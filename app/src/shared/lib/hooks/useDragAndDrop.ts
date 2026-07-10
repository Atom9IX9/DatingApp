"use client";
import { MutableRefObject, useEffect, useState } from "react";

// Custom hook that handles DragAndDrop logic.
export const useDragAndDrop = (
  onDrop: (file: File) => void,
  dropAreaRef?: MutableRefObject<HTMLDivElement | null>,
  allowedTypes?: string[],
) => {
  // React state storing isDragging values and updating them with IsDragging.
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const node = dropAreaRef?.current;
    if (!node) return;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer?.files;

      if (files && files.length > 0) {
        const file = files[0];
        if (allowedTypes && !allowedTypes.includes(file.type)) {
          setError("Unsupported file type");
          return;
        }
        onDrop(file);
      }
    };

    node.addEventListener("dragenter", handleDragEnter);
    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("dragleave", handleDragLeave);
    node.addEventListener("drop", handleDrop);

    // Render the component's JSX structure.
    return () => {
      node.removeEventListener("dragenter", handleDragEnter);
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("dragleave", handleDragLeave);
      node.removeEventListener("drop", handleDrop);
    };
  }, [dropAreaRef, allowedTypes, onDrop]);

  return { isDragging, error };
};
