import React from 'react';
import {
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {  Login, Register } from './Screens';
import { Stack } from './RootNavigator';
import { ScreenTypes } from '../Models/Navigation/NavigationModels';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../Store/Data/Auth/AuthSlice';
import IAm from '../views/auth/IAm/IAm';

type Props = {};

const AuthScreen = (props: Props) => {
  const token = useSelector(userDataSelector).token

  const Screens: ScreenTypes = [
    {
      name: 'Login',
      title: 'Login',
      Component: Login,
      options: { headerShown: false },
    },
    {
      name: "Register",
      title: "Register",
      Component: Register,
      options: { headerShown: false },
    },
    {
      name: "IAm",
      title: "IAm",
      Component: IAm,
      options: { headerShown: false },
    }
  ];
  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} />
      <Stack.Navigator
        initialRouteName={"IAm"}
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

export default AuthScreen;
