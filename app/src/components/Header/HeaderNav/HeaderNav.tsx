import Link from "next/link";
import NavElement from "./HeaderNavElement";
import { Colors } from "@/types/colors";
import style from "@/components/Header/header.module.scss";
import cn from "classnames";
import { Box, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import ChatIcon from "@mui/icons-material/Chat";

const HeaderNav = () => {
  return (
    <Box className={style.links}>
      <nav className={style.headerNav}>
        <NavElement title="home" to="/" color="secondary">
          <HomeIcon color={Colors.Secondary} fontSize="large" />
        </NavElement>
        <NavElement title="users" to="/users" color="primary">
          <Diversity1Icon color={Colors.Primary} fontSize="large" />
        </NavElement>
        <NavElement title="messages" to="/messages">
          <ChatIcon fontSize="large" sx={{ color: Colors.White }} />
        </NavElement>
      </nav>
    </Box>
  );
};

export default HeaderNav;
