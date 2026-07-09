import { Box } from "@mui/material";

export default function ProfileLoading() {
  return (
    <Box style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <Box component={"span"}>Loading...</Box>
    </Box>
  );
}
