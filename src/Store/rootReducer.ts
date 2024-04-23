import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./Data/Auth/AuthSlice";
import WalkThroughSlice from "./Data/WalkThrough/WalkThroughSlice";

const rootReducer = combineReducers({
  userData: UserSlice,
  walkThrough: WalkThroughSlice,
});

export default rootReducer;
