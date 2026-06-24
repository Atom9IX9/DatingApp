import { Button } from "@mui/material";

import style from "../matchmakingStyle.module.scss";

// Button component used for an action in src\features\matchmaking\ui\MatchBtn\MatchBtn.tsx.
const MatchBtn = () => {
  // Render the component's JSX structure.
  return (
    <Button
      sx={{ width: "100%", backgroundColor: "#e3507c", color: "#ffffff" }}
      className={style.matchBtn}
    >
      <span className={style.matchBtnText}>match</span>
    </Button>
  );
};

// Button component for a user action in src\features\matchmaking\ui\MatchBtn\MatchBtn.tsx.
export default MatchBtn;
