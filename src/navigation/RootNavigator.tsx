import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './MainStack';
import AuthScreen from './AuthScreen';
import { useSelector } from 'react-redux';
import Splash from '../views/public/Splash/Splash';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamsList } from '../Models/Navigation/NavigationModels';
import { navigationRef } from '../services/NavigationService';
import { useAppSelector } from '../Hooks/ReduxHooks';
import { userDataSelector } from '../Store/Data/Auth/AuthSlice';
import ProgressDialog from '../components/Modals/ProgressDIalog';
import notificationServices from '../services/notificationServices';


type Props = {};

export const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigator = (props: Props) => {
  const { isUserAuthenticated } = useAppSelector(userDataSelector);

  const [isSplashComplete, setIsSplashComplete] = useState(false);

  //// * --> splash screen changing <--- ////
  useEffect(() => {
    const change_screen = setTimeout(() => {
      setIsSplashComplete(true);
    }, 3100);
    return () => clearTimeout(change_screen);
  }, []);

  return (
    <>
      {isSplashComplete ? (
        <NavigationContainer ref={navigationRef}>
          <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
          <ProgressDialog
            onRef={(c: any) => {
              if (c) ProgressDialog.dialogInstance = c;
            }}
          />
          {isUserAuthenticated ? <MainStack /> : <AuthScreen />}
        </NavigationContainer>
      ) : (
        <Splash />
      )}
    </>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
