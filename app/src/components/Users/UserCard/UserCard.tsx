"use client"
import { Gender, PublicUser } from "@/models/user.model";
import { useTheme } from "@/Providers/ThemeProvider";
import { Colors } from "@/types/types";
import { Avatar, Button, Card } from "@mui/material";
import style from "./userCard.module.scss";
import classNames from "classnames";
import PlaceIcon from "@mui/icons-material/Place";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import { capitalize } from "@/utils/capitalize";
import { getUserStringLocation } from "@/utils/getUserStringLocation";

const UserCard: React.FC<TUserCardProps> = ({ user, isEven }) => {
  const theme = useTheme();

  return (
    <Card
      className={classNames(style.userCard, style[theme], {
        [style.even]: isEven,
      })}
    >
      <div className={style.avatarBlock}>
        <Avatar
          sx={{
            bgcolor:
              theme === "light" ? Colors.PrimaryLight : Colors.SecondaryDark600,
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
      </div>
      <div className={style.userAge}>
        <span className={style.userAgeText}>age</span>
        <span className={style.userAgeNumber}>{user.age}</span>
      </div>
      <section className={style.userInfoSection}>
        <h3 className={style.userFullName}>
          {user.firstName} {user.lastName}
        </h3>
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
                <MaleIcon sx={{ fontSize: 24, color: Colors.PrimaryLight }} />
              ) : (
                <FemaleIcon sx={{ fontSize: 24, color: Colors.PrimaryLight }} />
              )}{" "}
            </div>
            <div>{capitalize(user.gender)}</div>
          </li>
        </ul>
        <div className={style.userDescription}>{user.description}</div>
      </section>
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
