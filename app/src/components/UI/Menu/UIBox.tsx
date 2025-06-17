import { useTheme } from "@/Providers/ThemeProvider";
import { Colors, TChildren } from "@/types/types";
import { Box } from "@mui/material";

const UIBox: React.FC<Props> = ({ children, bg = "prymary", className }) => {
  const theme = useTheme();

  return (
    <Box
      className={className}
      sx={{
        bgcolor: theme === "dark" ? bg : Colors.White,
        color:
          theme === "dark" ? Colors.PrimaryContrastText : Colors.PrimaryDark,
      }}
    >
      {children}
    </Box>
  );
};

export default UIBox;
type Props = {
  children: TChildren;
  bg?: "secondary" | "primary";
  className?: string;
};
