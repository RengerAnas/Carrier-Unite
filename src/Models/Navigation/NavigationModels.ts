import { RouteProp } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp } from "@react-navigation/stack";
import { ImageSourcePropType } from "react-native";
import { driverHomeType } from "../Home/Order.modal";
import { VehicleType } from "../Profile/Profile.modal";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { initialValus } from "../../views/Recruiter/Screens/CreateJob";

export type AuthStackParamsList = {
   Login: undefined;
   Register: undefined;
   IAm: undefined;
   ForgotPassword: undefined;
   SignUp: undefined;
};

export type MainStackParamsList = {
   BottomTabs: undefined;
   EditProfile: undefined;
   ChangePass: undefined;
   Settings: undefined;
   JobDetail: {
      id: string, isFromAppliedJobs?: boolean,
      isSaved?: any
      savedId?: any

   };
   SearchJob: undefined
   JobSeekerDetail: { id: string | number, requestId: any }
};

export type BottomTabStackParamsList = {
   Home: undefined;
   "Create Job"?: typeof initialValus;
   "Posted Jobs": undefined;
   "My Profile": undefined;
   "Saved Jobs": undefined;
   "Applied Jobs": undefined;
};

export type RootStackParamsList = AuthStackParamsList & MainStackParamsList;

export type ScreenTypes = {
   name: keyof RootStackParamsList;
   title: keyof RootStackParamsList;
   Component: React.FC<any>;
   options: StackNavigationOptions;
}[];

export type BottomTabsScreenTypes = {
   name: keyof BottomTabStackParamsList;
   title?: keyof BottomTabStackParamsList;
   Component: React.FC<any>;
   options?: BottomTabNavigationOptions;
   icons: ImageSourcePropType[];
}[];

export interface NavigationProps<T extends keyof RootStackParamsList | keyof BottomTabStackParamsList> {
   navigation: StackNavigationProp<RootStackParamsList & BottomTabStackParamsList, T>;
   route: RouteProp<RootStackParamsList & BottomTabStackParamsList, T>;
}
