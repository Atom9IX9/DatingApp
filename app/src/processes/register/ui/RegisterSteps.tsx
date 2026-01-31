import { Box } from "@mui/material";
import React from "react";
import style from "./registerStepsStyle.module.scss";

const Step: React.FC<StepProps> = ({ isCurrent, isPassed, number, stepsCount }) => {
  return (
    <>
      <Box
        className={style.step}
        sx={{
          border: 3,
          borderColor: isCurrent || isPassed ? "success.main" : "#000000",
          bgcolor: isPassed ? "success.main" : "transparent",
        }}
      >
        {number}
      </Box>
      {number !== stepsCount.toString() && (
        <Box
          sx={{
            height: 3,
            width: 83,
            bgcolor: isPassed || isCurrent ? "success.main" : "#000000",
            opacity: isCurrent ? 0.3 : 1,
          }}
        ></Box>
      )}
    </>
  );
};

const RegisterSteps: React.FC<Props> = ({ currentStep, stepsCount }) => {
  const renderSteps = () => {
    const steps = [];

    for (let i = 1; i <= stepsCount; i++) {
      if (i < currentStep) {
        steps.push(<Step stepsCount={stepsCount} key={i} number={i.toString()} isPassed={true} />);
      } else if (i === currentStep) {
        steps.push(<Step stepsCount={stepsCount} key={i} number={i.toString()} isCurrent={true} />);
      } else {
        steps.push(<Step stepsCount={stepsCount} key={i} number={i.toString()} />);
      }
    }

    return steps;
  };

  return <Box className={style.registerStepsContainer}>{renderSteps()}</Box>;
};

export default RegisterSteps;
type Props = {
  currentStep: number;
  stepsCount: number;
};
type StepProps = {
  isPassed?: boolean;
  isCurrent?: boolean;
  key: number;
  number: string;
  stepsCount: number;
};
