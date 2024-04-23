import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logOut } from "../Auth/AuthSlice";

const initialState = {
  isSubscriptionPlanShowed: false,
};

const walkThroughSlice = createSlice({
  name: "walkThrough",
  initialState,
  reducers: {
    setSubscriptionPlanShowed: (state, action: PayloadAction<boolean>) => {
      state.isSubscriptionPlanShowed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut, (state, action) => {
      state.isSubscriptionPlanShowed = false;
    });
  },
});

export default walkThroughSlice.reducer;
export const { setSubscriptionPlanShowed } = walkThroughSlice.actions;
