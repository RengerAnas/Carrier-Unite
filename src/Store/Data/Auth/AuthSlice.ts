import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../Store";
import { driverDataType, userDataType } from "../../../Models/Auth/Auth.modal";


const userType = {
   "companyName": "",
   "mobileNumber": "",
   "email": "",
   "password": "",
   "address": "",
   "description": "",
   "name": "",
   "gender": "1",
   "dateOfBirth": "",
   "id": 1,
   "jobTitle": "",
}

//? 1 for JobSeeker and 2 for Recruiter
export type userData = {
   data?: typeof userType;
   userType?: number;
   isUserAuthenticated?: boolean;
};
const initialState: userData = {
   data: undefined,
   isUserAuthenticated: false,
};

const UserSlice = createSlice({
   name: "userData",
   initialState,
   reducers: {
      setUserData: (state, action: PayloadAction<userData["data"]>) => {
         state.data = action.payload;
      },
      setUserType: (state, action: PayloadAction<userData["userType"]>) => {
         state.userType = action.payload;
      },
      setAuthentication: (state, action: PayloadAction<userData["isUserAuthenticated"]>) => {
         state.isUserAuthenticated = action.payload;
      },
      logOut: (state) => {
         return (state = { ...initialState });
      },
   },
   extraReducers(builder) {
   },
});

export default UserSlice.reducer;
export const userDataSelector = (state: RootState) => state.userData;
export const {
   setUserData,
   setUserType,
   logOut,
   setAuthentication,
} = UserSlice.actions;
