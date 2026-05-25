import { Button, ButtonProps } from "@mui/material";

const BaseBtn: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      sx={{
        width: "100%",
        height: 62,
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

export default BaseBtn;
