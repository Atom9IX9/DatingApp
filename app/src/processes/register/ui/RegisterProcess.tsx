"use client";
import { Box } from "@mui/material";
import style from "./registerProcessStyle.module.scss";
import { selectCurrentStep, selectStepsCount } from "../model/selectors";
import { useAppSelector } from "@/shared/lib";
import RegisterSteps from "./RegisterSteps";

const RegisterProcess: React.FC = () => {
  const currentStep = useAppSelector(selectCurrentStep);
  const stepsCount = useAppSelector(selectStepsCount);

  return (
    <Box className={style.registerProcessContainer} component="section">
      <Box className={style.registerProcess}>
        <h2>Register</h2>
        <RegisterSteps currentStep={currentStep} stepsCount={stepsCount} />
      </Box>
    </Box>
  );
};

export default RegisterProcess;
