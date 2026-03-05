import { Backdrop, CircularProgress } from "@mui/material";

const BackdropLoader: React.FC<Props> = ({ isOpen }) => {
  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        borderRadius: 2,
      })}
      open={isOpen}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default BackdropLoader;
type Props = { isOpen: boolean }
