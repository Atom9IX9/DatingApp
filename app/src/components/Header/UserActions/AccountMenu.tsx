import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Logout from "@mui/icons-material/Logout";
import { useCallback, useState } from "react";
import { Colors } from "@/types/types";
import style from "@/components/Header/header.module.scss";
import AccountMenuBtn from "./AccountMenuBtn";
import { useTheme } from "@/Providers/ThemeProvider";
import UIMenu from "@/components/UI/Menu/UIMenu";

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  return (
    <>
      <AccountMenuBtn
        firstName="User"
        lastName="Name"
        handleClick={handleClick}
        isOpen={open}
      />
      <UIMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        isOpen={open}
        theme={theme}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ bgcolor: theme === "dark" ? Colors.Gray : "" }} /> My
          account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ManageAccountsIcon
              sx={{ color: theme === "dark" ? Colors.Light : "" }}
              fontSize="small"
            />
          </ListItemIcon>
          Edit account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <RecentActorsIcon
              sx={{ color: theme === "dark" ? Colors.Light : "" }}
              fontSize="small"
            />
          </ListItemIcon>
          Photos
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PeopleIcon
              sx={{ color: theme === "dark" ? Colors.Light : "" }}
              fontSize="small"
            />
          </ListItemIcon>
          Matches
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: Colors.Danger }}>
          <ListItemIcon>
            <Logout sx={{ color: Colors.Danger }} fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </UIMenu>
    </>
  );
};

export default AccountMenu;
