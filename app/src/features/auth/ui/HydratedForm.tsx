"use client";

import { Box } from "@mui/material";

import { TChildren } from "@/shared/types";
import { BackdropLoader } from "@/shared/ui";
import { useHydration } from "@/shared/lib";

// Form component that captures hydrated input.
const HydratedForm: React.FC<Props> = ({ children, className, onSubmit }) => {
  const isHydrated = useHydration();

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
