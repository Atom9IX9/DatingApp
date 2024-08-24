import { useCallback, useState } from "react";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return { isOpen, handleClick, handleClose, anchorEl }
}