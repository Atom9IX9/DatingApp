import classNames from "classnames";
import style from "./welcomeBlock.module.scss";

const WelcomeBlock = () => {
  return (
    <div className={style.container}>
      <div className={style.mainPart}>
        <div className={style.welcomeText}>
          Hello,
          <br />
          <span className={classNames(style.bold, style.welcomeTo)}>
            welcome to!
          </span>
        </div>

      </div>
      <div className={style.creatorLink}>
        <a href="https://github.com/Atom9IX9" target="_blank">
          <div>
            Creator <span>HERE</span>
          </div>
          <div>Atom9IX9</div>
        </a>
      </div>
      <div className={style.decorationBlockRightBottom}></div>
    </div>
  );
};

export default WelcomeBlock;
