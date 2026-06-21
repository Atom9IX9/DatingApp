"use client"
import { MutableRefObject, useEffect, useState } from "react";

// Custom hook that handles DragAndDrop logic.
export const useDragAndDrop = (
  allowedTypes: string[],
  dropAreaRef?: MutableRefObject<HTMLDivElement | null>,
) => {
// React state storing isDragging values and updating them with IsDragging.
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File>();
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

      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        if (!allowedTypes.includes(e.dataTransfer.files[0].type)) {
          setError("Unsupported file type");
          return;
        }
        setFile(e.dataTransfer.files[0]);
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
  }, [dropAreaRef, allowedTypes]);

  const resetFile = () => setFile(undefined);

  return { isDragging, file, resetFile, error };
};
