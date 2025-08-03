import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import EditIcon from "@mui/icons-material/Edit";
import Logout from "@mui/icons-material/Logout";
import { Colors } from "@/types/colors";
import AccountMenuBtn from "./AccountMenuBtn";
import { useTheme } from "@/shared/lib/hooks/useTheme";
import  UIMenu from "@/shared/ui/UIMenu";
import { useMenu } from "@/hooks/useMenu";
import { useAuth } from "@/shared";

const AccountMenu = () => {
  const { anchorEl, handleClick, handleClose, isOpen } = useMenu();

  const theme = useTheme();
  const auth = useAuth();

  return (
    <>
      <AccountMenuBtn
        firstName={auth?.firstName}
        lastName={auth?.lastName}
        avatar={/*auth?.photos.avatar ||*/ null}
        handleClick={handleClick}
        isOpen={isOpen}
      />
      <UIMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        isOpen={isOpen}
        theme={theme}
      >
        <MenuItem onClick={handleClose}>
          <Avatar sx={{ bgcolor: theme === "dark" ? Colors.Gray : "" }} /> My
          account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <EditIcon
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
