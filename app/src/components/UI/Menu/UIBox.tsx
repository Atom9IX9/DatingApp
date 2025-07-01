import { useTheme } from "@/Providers/ThemeProvider";
import { TChildren } from "@/types/types";
import { Colors } from "@/types/colors";
import { Box } from "@mui/material";

const UIBox: React.FC<Props> = ({
  children,
  bg = Colors.InfoDark,
  className,
}) => {
  const theme = useTheme();

  return (
    <Box
      className={className}
      sx={{
        bgcolor: theme === "dark" ? bg : Colors.White,
        color: Colors.InfoDark,
      }}
    >
      {children}
    </Box>
  );
};

export default UIBox;
type Props = {
  children: TChildren;
  bg?: Colors;
  className?: string;
};
