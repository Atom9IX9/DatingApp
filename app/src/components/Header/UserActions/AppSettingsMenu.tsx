import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Colors } from "@/types/types";
import { useTheme } from "@/Providers/ThemeProvider";
import UIMenu from "@/components/UI/Menu/UIMenu";
import { useMenu } from "@/hooks/useMenu";
import UIIconMenuButton from "@/components/UI/Menu/UIIconMenuButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { IconButton } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useAppDispatch } from "@/lib/store/hooks";
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
  const dispatch = useAppDispatch()

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
                theme === "light"
                  ? Colors.SecondaryLight + "40"
                  : "transparent",
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
            bgcolor:
              theme === "dark" ? Colors.PrimaryLight + "30" : "transparent",
            "&:hover": {
              bgcolor: theme === "dark" ? Colors.PrimaryLight + "30" : "",
            },
          }}
        >
          <DarkModeIcon
            sx={{
              color:
                theme === "dark"
                  ? Colors.TriadicLight
                  : Colors.SecondaryDark600,
            }}
            fontSize="large"
          />
        </IconButton>
      </ListItemIcon>
    </>
  );
};

export default AppSettingsMenu;
