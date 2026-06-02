"use client";

import { TChildren } from "@/shared/types";
import { BackdropLoader } from "@/shared/ui";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const HydratedForm: React.FC<Props> = ({ children, className, onSubmit }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <Box component="form" className={className} onSubmit={onSubmit}>
      <BackdropLoader isOpen={!isHydrated} renderBeforeHydration={true} />
      {children}
    </Box>
  );
};

export default HydratedForm;
export type Props = {
  children: TChildren;
  className?: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
};
