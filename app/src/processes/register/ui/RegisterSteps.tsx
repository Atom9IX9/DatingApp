import { Box } from "@mui/material";
import React from "react";
import style from "./registerStepsStyle.module.scss";
import { OnboardingStep } from "../types";
import { ResponseOnboardingStep } from "@/features/auth/types";

const Step: React.FC<StepProps> = React.memo(
  ({ isCurrent, isPassed, number, stepsCount }) => {
    // Render the component's JSX structure.
    return (
      <>
        <Box
          className={style.step}
          sx={{
            border: 3,
            borderColor: isCurrent || isPassed ? "success.main" : "#000000",
            color: isCurrent || isPassed ? "#ffffff" : "#000000",
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
  },
);

const RegisterSteps: React.FC<Props> = ({ currentStep, stepsCount }) => {
  const renderSteps = () => {
    const steps = [];

    for (let i = 1; i <= stepsCount; i++) {
      if (
        currentStep !== ResponseOnboardingStep.REGISTERED &&
        i < currentStep
      ) {
        steps.push(
          <Step
            stepsCount={stepsCount}
            key={i}
            number={i.toString()}
            isPassed={true}
          />,
        );
      } else if (i === currentStep) {
        steps.push(
          <Step
            stepsCount={stepsCount}
            key={i}
            number={i.toString()}
            isCurrent={true}
          />,
        );
      } else {
        steps.push(
          <Step stepsCount={stepsCount} key={i} number={i.toString()} />,
        );
      }
    }

    return steps;
  };

  return <Box className={style.registerStepsContainer}>{renderSteps()}</Box>;
};

Step.displayName = "Step";

export default React.memo(RegisterSteps);
// Type describing component props.
type Props = {
  currentStep: OnboardingStep;
  stepsCount: number;
};
// Props type for the Step component.
type StepProps = {
  isPassed?: boolean;
  isCurrent?: boolean;
  number: string;
  stepsCount: number;
};
