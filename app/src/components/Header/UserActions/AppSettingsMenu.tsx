import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Colors } from "@/types/colors";
import { UIMenu, useTheme } from "@/shared";
import { UIIconMenuButton } from "@/shared";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useAppDispatch, useMenu } from "@/shared";
import { setTheme } from "@/lib/store/slices/appSlice/appSlice";

const AppSettingsMenu = () => {
  const { anchorEl, handleClick, handleClose, isOpen } = useMenu();

  const theme = useTheme();

  return (
    <>
      <UIIconMenuButton
        title="Settings"
        handleClick={handleClick}
        isOpen={isOpen}
      >
        <MoreVertIcon sx={{ color: Colors.Light, width: 30, height: 30 }} />
      </UIIconMenuButton>
      <UIMenu
        anchorEl={anchorEl}
        handleClose={handleClose}
        isOpen={isOpen}
        theme={theme}
      >
        <MenuItem
          onClick={(e) => e.stopPropagation()}
          disableRipple
          sx={{
            justifyContent: "space-between",
            cursor: "default",
            "&:hover": {
              bgcolor: "transparent",
            },
          }}
        >
          <SwitchColorTheme />
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <HelpOutlineIcon
              sx={{ color: theme === "dark" ? Colors.Light : "" }}
              fontSize="small"
            />
          </ListItemIcon>
          About project
        </MenuItem>
      </UIMenu>
    </>
  );
};

const SwitchColorTheme = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  return (
    <>
      <ListItemIcon>
        <IconButton
          size="large"
          onClick={() => dispatch(setTheme("light"))}
          sx={{
            borderRadius: "15px",
            bgcolor:
              theme === "light" ? Colors.SecondaryLight + "40" : "transparent",
            "&:hover": {
              bgcolor:
                theme === "light" ? Colors.SecondaryLight + "40" : "#00000010",
            },
          }}
        >
          <LightModeIcon
            sx={{
              color: theme === "light" ? Colors.TriadicLight900 : Colors.Light,
            }}
            fontSize="large"
          />
        </IconButton>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton
          size="large"
          onClick={() => dispatch(setTheme("dark"))}
          sx={{
            borderRadius: "15px",
            bgcolor: theme === "dark" ? "#e3507c43" : "transparent",
            "&:hover": {
              bgcolor: theme === "dark" ? "#e3507c43" : "",
            },
          }}
        >
          <DarkModeIcon
            sx={{
              color: theme === "dark" ? Colors.TriadicLight : Colors.Gray,
            }}
            fontSize="large"
          />
        </IconButton>
      </ListItemIcon>
    </>
  );
};

export default AppSettingsMenu;
