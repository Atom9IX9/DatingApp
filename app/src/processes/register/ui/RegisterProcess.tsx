"use client";

import { Box } from "@mui/material";

import { useAppSelector } from "@/root/model";

import { selectCurrentStep, selectStepsCount } from "../model/selectors";

import RegisterSteps from "./RegisterSteps";
import RegisterProcessForms from "./RegisterProcessForms";
import style from "./registerProcessStyle.module.scss";

const RegisterProcess: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const stepsCount = useAppSelector(selectStepsCount);

  // Render the component's JSX structure.
  return (
    <Box
      className={style.registerProcessContainer}
      component="section"
      sx={{ userSelect: "none" }}
    >
      <Box className={style.registerProcess}>
        <h2>Register</h2>
        <RegisterSteps currentStep={currentStep} stepsCount={stepsCount} />
        <RegisterProcessForms currentStep={currentStep} />
      </Box>
    </Box>
  );
};

export default RegisterProcess;
