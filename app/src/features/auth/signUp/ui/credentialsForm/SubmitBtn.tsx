import { Button } from "@mui/material";

const SubmitBtn: React.FC<SubmitBtnProps> = () => {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        width: 383,
        height: 62,
        borderRadius: "9px",
        fontSize: 20,
        fontWeight: 600,
        fontFamily: "var(--font-primary)",
        textTransform: 'none'
      }}
    >
      Continue
    </Button>
  );
};

export default SubmitBtn;
type SubmitBtnProps = {};
