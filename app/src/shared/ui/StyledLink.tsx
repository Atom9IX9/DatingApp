
import Link from "next/link";
import { Colors, TChildren } from "../types";
import { Box } from "@mui/material";

const StyledLink: React.FC<Props> = ({ children, href }) => {
// Render the component's JSX structure.
  return (
    <Link href={href}>
      <Box
        sx={{
          color: Colors.Success,
          textDecoration: "underline",
          display: "inline",
          fontStyle: "italic",
        }}
      >
        {children}
      </Box>
    </Link>
  );
};

export default StyledLink;
// Type describing component props.
type Props = {
  children: TChildren;
  href: string;
};
