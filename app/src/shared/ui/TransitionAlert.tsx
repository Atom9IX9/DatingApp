
import * as React from "react";
import Box from "@mui/material/Box";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@emotion/react";

const appearAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function TransitionAlerts({ alert, severity, isOpen }: Props) {
  const [open, setOpen] = React.useState(isOpen);

// Render the component's JSX structure.
  return (
    <Box
      sx={{
        width: "100%",
        animation: `${appearAnimation} 0.5s ease-out forwards`,
      }}
    >
      <Collapse in={open}>
        <Alert
          severity={severity}
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {alert}
        </Alert>
      </Collapse>
    </Box>
  );
}

// Type describing component props.
type Props = {
  alert: string | null;
  severity: AlertColor;
  isOpen?: boolean;
};
