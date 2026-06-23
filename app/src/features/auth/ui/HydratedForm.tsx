
"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import { TChildren } from "@/shared/types";
import { BackdropLoader } from "@/shared/ui";

// Form component that captures hydrated input.
const HydratedForm: React.FC<Props> = ({ children, className, onSubmit }) => {
// React state storing isHydrated values and updating them with IsHydrated.
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

// Render the component's JSX structure.
  return (
    <Box component="form" className={className} onSubmit={onSubmit}>
      <BackdropLoader isOpen={!isHydrated} renderBeforeHydration={true} />
      {children}
    </Box>
  );
};

// Form component that captures hydrated input.
export default HydratedForm;
// Exported type alias used for typing shared data shapes.
export type Props = {
  children: TChildren;
  className?: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
};
