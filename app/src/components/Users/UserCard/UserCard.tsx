"use client";
import { Gender, PublicUser } from "@/models/user.model";
import { useTheme } from "@/Providers/ThemeProvider";
import { Colors } from "@/types/types";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import style from "./userCard.module.scss";
import classNames from "classnames";
import PlaceIcon from "@mui/icons-material/Place";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { capitalize } from "@/utils/capitalize";
import { getUserStringLocation } from "@/utils/getUserStringLocation";
import UIBox from "@/components/UI/Menu/UIBox";

const UserCard: React.FC<TUserCardProps> = ({ user, isEven }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: theme === "dark" ? Colors.PrimaryDark : Colors.PrimaryLight,
      }}
      className={classNames(style.userCard, style[theme], {
        [style.even]: isEven,
      })}
    >
      <Box className={style.avatarBlock}>
        <Avatar
          sx={{
            bgcolor:
              theme === "light" ? Colors.Primary : Colors.SecondaryDark600,
          }}
          className={style.userAvatar}
        />
        <div
          className={classNames(
            style.onlineStatus,
            user.isOnline ? style.online : style.offline,
            style[theme]
          )}
        ></div>
      </Box>
      <Box className={style.userAge}>
        <span className={style.userAgeText}>age</span>
        <span className={style.userAgeNumber}>{user.age}</span>
      </Box>
      <Box component="section" className={style.userInfoSection}>
        <Typography
          variant="h3"
          color={
            theme === "dark" ? Colors.PrimaryContrastText : Colors.PrimaryDark
          }
          className={style.userFullName}
        >
          {user.firstName} {user.lastName}
        </Typography>
        <ul className={style.details}>
          {!!user.location && (
            <li>
              <div className={style.marker}>
                <PlaceIcon
                  sx={{ fontSize: 24, color: Colors.SecondaryLight }}
                />
              </div>
              <div>{getUserStringLocation(user.location)}</div>
            </li>
          )}
          <li>
            <div className={style.marker}>
              {user.gender === Gender.Male ? (
                <MaleIcon sx={{ fontSize: 24, color: Colors.Primary }} />
              ) : (
                <FemaleIcon sx={{ fontSize: 24, color: Colors.Primary }} />
              )}{" "}
            </div>
            <div>{capitalize(user.gender)}</div>
          </li>
        </ul>
        <UIBox className={style.userDescription}>{user.description}</UIBox>
      </Box>
      <Button className={style.matchBtn}>
        <span className={style.matchBtnText}>match</span>
      </Button>
    </Card>
  );
};

export default UserCard;
type TUserCardProps = {
  user: PublicUser;
  isEven?: boolean;
};
