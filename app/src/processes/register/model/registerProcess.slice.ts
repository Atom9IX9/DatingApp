import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TInitialState = {
  currentStep: 3,
  stepsCount: 4,
};

const registerProcessSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    }
  }
})

export default registerProcessSlice.reducer
export const { setCurrentStep } = registerProcessSlice.actions

export type TInitialState = {
  currentStep: number;
  stepsCount: number;
};
