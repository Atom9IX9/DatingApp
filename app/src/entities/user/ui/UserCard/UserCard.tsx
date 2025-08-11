"use client";
import { UserGender, PublicUser } from "@/entities";
import { capitalize, useTheme } from "@/shared";
import { Colors } from "@/types/colors";
import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import style from "./userCard.module.scss";
import classNames from "classnames";
import PlaceIcon from "@mui/icons-material/Place";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { getUserStringLocation } from "../../lib/helpers/getUserStringLocation";

const UserCard: React.FC<TUserCardProps> = ({ user, isEven }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: Colors.InfoDark,
        borderRadius: "14px",
      }}
      className={classNames(style.userCard, style[theme], {
        [style.even]: isEven,
      })}
    >
      <Box className={style.avatarBlock}>
        <Avatar
          sx={{
            bgcolor: Colors.Info,
          }}
          className={style.userAvatar}
        />
        <Box
          className={classNames(
            style.onlineStatus,
            user.isOnline ? style.online : style.offline,
            style[theme]
          )}
          sx={{ border: 5, borderColor: Colors.InfoDark }}
        ></Box>
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
              {user.gender === UserGender.Male ? (
                <MaleIcon color={Colors.Primary} sx={{ fontSize: 24 }} />
              ) : (
                <FemaleIcon color={Colors.Primary} sx={{ fontSize: 24 }} />
              )}{" "}
            </div>
            <div>{capitalize(user.gender)}</div>
          </li>
        </ul>
        <Box
          className={style.userDescription}
          sx={{ color: Colors.InfoContrastText }}
        >
          {user.description}
        </Box>
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
