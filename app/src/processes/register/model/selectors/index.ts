import { RootState } from "@/root";

export const selectCurrentStep = (state: RootState) => state.registerProcess.currentStep;
export const selectStepsCount = (state: RootState) => state.registerProcess.stepsCount;
