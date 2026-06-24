"use client";
import { useCallback, useState } from "react";

// Custom hook that handles Menu logic.
export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // Boolean helper that checks whether open is true.
  const isOpen = Boolean(anchorEl);
  // Memoized callback to avoid recreating the handler each render.
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return { isOpen, handleClick, handleClose, anchorEl };
};
