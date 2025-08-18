import { Button } from "@mui/material";
import style from "../matchmakingStyle.module.scss";

const MatchBtn = () => {
  return (
    <Button className={style.matchBtn}>
      <span className={style.matchBtnText}>match</span>
    </Button>
  );
};

export default MatchBtn;
