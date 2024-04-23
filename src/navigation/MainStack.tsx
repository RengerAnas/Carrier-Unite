import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import {
   CardStyleInterpolators,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import { Stack } from './RootNavigator';
import { ScreenTypes } from '../Models/Navigation/NavigationModels';
import ChangePass from '../views/private/Profile/Screens/ChangePass';
import EditProfile from '../views/private/Profile/Screens/EditProfile';
import JobDetail from '../views/private/JobDetail/JobDetail';
import SearchJob from '../views/private/Search/SearchJob';
import JobSeekerDetail from '../views/JobSeeker/Screens/JobSeekerDetail';
// import {  ChangePass, EditProfile, Settings } from './Screens';
// import Search from '../views/User/Search/Search';
// import SendOffer from '../views/User/SendOffer/SendOffer';

const MainStack = () => {


   const Screens: ScreenTypes = [
      {
         name: 'BottomTabs',
         title: 'BottomTabs',
         Component: BottomTabs,
         options: { headerShown: false },
      },
      {
         name: 'EditProfile',
         title: 'EditProfile',
         Component: EditProfile,
         options: { headerShown: false },
      },
      {
         name: 'ChangePass',
         title: 'ChangePass',
         Component: ChangePass,
         options: { headerShown: false },
      },
      {
         name: 'JobDetail',
         title: 'JobDetail',
         Component: JobDetail,
         options: { headerShown: false },
      },
      {
         name: 'SearchJob',
         title: 'SearchJob',
         Component: SearchJob,
         options: { headerShown: false },
      },
      {
         name: 'JobSeekerDetail',
         title: 'JobSeekerDetail',
         Component: JobSeekerDetail,
         options: { headerShown: false },
      },

      // {
      //    name: 'Settings',
      //    title: 'Settings',
      //    Component: Settings,
      //    options: { headerShown: false },
      // },
      // {
      //    name: 'Search',
      //    title: 'Search',
      //    Component: Search,
      //    options: { headerShown: false },
      // },
      // {
      //    name: 'SendOffer',
      //    title: 'SendOffer',
      //    Component: SendOffer,
      //    options: { headerShown: false },
      // },

   ];


   return (
      <>
         <StatusBar translucent backgroundColor={'transparent'} />
         <Stack.Navigator
            initialRouteName="BottomTabs"
            screenOptions={({ navigation }) => ({
               cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
               headerTitleAlign: 'center',
            })}>
            {Screens.map(screen => {
               return (
                  <Stack.Screen
                     key={screen.name}
                     name={screen.name}
                     component={screen.Component}
                     options={({ navigation }) => {
                        return {
                           ...screen.options,
                        };
                     }}
                  />
               );
            })}
         </Stack.Navigator>
      </>
   );
};

export default MainStack;

const styles = StyleSheet.create({});
