import { Button, ButtonProps } from "@mui/material";

// Button component used for an action in src\shared\ui\BaseBtn.tsx.
const BaseBtn: React.FC<ButtonProps> = (props) => {
  // Render the component's JSX structure.
  return (
    <Button
      {...props}
      sx={{
        width: "100%",
        height: "62px",
        borderRadius: "9px",
        fontSize: 20,
        fontWeight: 600,
        fontFamily: "var(--font-primary)",
        textTransform: "none",
      }}
    >
      {props.children}
    </Button>
  );
};

// Button component for a user action in src\shared\ui\BaseBtn.tsx.
export default BaseBtn;
