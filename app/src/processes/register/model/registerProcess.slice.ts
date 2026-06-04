import { OnboardingStep, ResponseOnboardingStep } from "@/features/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TInitialState = {
  currentStep: 1,
  stepsCount: 4,
  isRegistred: false,
};

const registerProcessSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<OnboardingStep>) => {
      if (action.payload !== ResponseOnboardingStep.REGISTERED) {
        state.currentStep = action.payload;
      } else {
        state.isRegistred = true;
      }
    },
  },
});

export default registerProcessSlice.reducer;
export const { setCurrentStep } = registerProcessSlice.actions;

export type TInitialState = {
  currentStep: OnboardingStep;
  stepsCount: number;
  isRegistred: boolean;
};
