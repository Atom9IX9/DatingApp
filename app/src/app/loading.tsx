import { Box } from "@mui/material";

export default function AppLoading() {
  return (
    <Box style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <Box component={"span"}>Loading...</Box>
    </Box>
  );
}
