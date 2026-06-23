import { RegisterProcessStateSchema } from "../registerProcess.slice";

export const selectCurrentStep = (state: RegisterProcessStateSchema) => state.registerProcess.currentStep;
export const selectStepsCount = (state: RegisterProcessStateSchema) => state.registerProcess.stepsCount;
