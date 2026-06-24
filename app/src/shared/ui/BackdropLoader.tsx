import { Backdrop, Box, CircularProgress } from "@mui/material";

const BackdropLoader: React.FC<Props> = ({ isOpen, renderBeforeHydration }) => {
  if (renderBeforeHydration && isOpen)
    // Render the component's JSX structure.
    return (
      <Box
        component="div"
        bgcolor="rgba(0,0,0,0.35)"
        zIndex={10}
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: 2,
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    );

  // Render the component's JSX structure.
  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.modal + 1,
        borderRadius: 2,
      })}
      open={isOpen}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default BackdropLoader;
// Type describing component props.
type Props = { isOpen: boolean; renderBeforeHydration?: boolean };
