import { Button } from "@mui/material";
import style from "../matchmakingStyle.module.scss";

const MatchBtn = () => {
  return (
    <Button
      sx={{ width: "100%", backgroundColor: "#e3507c", color: "#ffffff" }}
      className={style.matchBtn}
    >
      <span className={style.matchBtnText}>match</span>
    </Button>
  );
};

export default MatchBtn;
