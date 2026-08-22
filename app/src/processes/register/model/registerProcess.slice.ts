import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { OnboardingStep, ResponseOnboardingStep } from "@/shared/types";

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
    setStep: (state, action: PayloadAction<OnboardingStep>) => {
      if (action.payload !== ResponseOnboardingStep.REGISTERED) {
        state.currentStep = action.payload;
      } else {
        state.isRegistered = true;
      }
    },
  },
});

const { setStep } = registerProcessSlice.actions;

export const setCurrentStep = createAsyncThunk(
  "registerProcess/setCurrentStep",
  async (step: OnboardingStep, { dispatch }) => {
    dispatch(setStep(step));
  },
);

// Redux slice that manages registerProcess state.
export default registerProcessSlice.reducer;

// Exported type alias used for typing shared data shapes.
export type TInitialState = {
  currentStep: OnboardingStep;
  stepsCount: number;
  isRegistered: boolean;
};
