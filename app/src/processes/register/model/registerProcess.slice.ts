
import { OnboardingStep, ResponseOnboardingStep } from "@/features/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// State shape for initial.
const initialState: TInitialState = {
  currentStep: 1,
  stepsCount: 4,
  isRegistered: false,
};

// Redux slice that manages the registerProcess state.
const registerProcessSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<OnboardingStep>) => {
      if (action.payload !== ResponseOnboardingStep.REGISTERED) {
        state.currentStep = action.payload;
      } else {
        state.isRegistered = true;
      }
    },
  },
});

// Redux slice that manages registerProcess state.
export default registerProcessSlice.reducer;
export const { setCurrentStep } = registerProcessSlice.actions;

// Exported type alias used for typing shared data shapes.
export type TInitialState = {
  currentStep: OnboardingStep;
  stepsCount: number;
  isRegistered: boolean;
};
