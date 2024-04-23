import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DEVICE_TYPE, Styles } from '../constants/Utils';

import Colors from '../constants/Colors';

import Images from '../constants/Images';
import Fonts from '../constants/Fonts';
import { Home, Profile } from './Screens';
import { BottomTabStackParamsList, BottomTabsScreenTypes } from '../Models/Navigation/NavigationModels';
import { useAppSelector } from '../Hooks/ReduxHooks';
import CreateJob from '../views/Recruiter/Screens/CreateJob';
import PostedJobs from '../views/Recruiter/Screens/PostedJobs';
import SavedJobs from '../views/JobSeeker/Screens/SavedJobs';
import ManageJobs from '../views/JobSeeker/Screens/ManageJobs';


type Props = {};

const Tab = createBottomTabNavigator<BottomTabStackParamsList>();

const BottomTabs = (props: Props) => {
  const isJobSeeker = useAppSelector(state => state.userData.userType) == 1

  const Screens: BottomTabsScreenTypes = [
    {
      name: "Home",
      Component: Home,
      icons: [Images.home, Images.homeActive],
    },
    {
      name: "My Profile",
      Component: Profile,
      icons: [Images.Profile, Images.ProfileActive],
    },
  ];

  if (!isJobSeeker) {
    Screens.splice(1, 0, {
      name: "Create Job",
      Component: CreateJob,
      icons: [Images.add, Images.addActive],
    }, {
      name: "Posted Jobs",
      Component: PostedJobs,
      icons: [Images.jobs, Images.jobsActive],
    })
  } else {
    Screens.splice(1, 0, {
      name: "Saved Jobs",
      Component: SavedJobs,
      icons: [Images.save, Images.saveActive],
    },
      {
        name: "Applied Jobs",
        Component: ManageJobs,
        icons: [Images.jobs, Images.jobsActive],
      }
    )

  }

  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: '',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: DEVICE_TYPE == 'ios' ? 100 : 70,
          padding: 10,
          backgroundColor: '#ffffff',
          elevation: 10,
          shadowOpacity: 0.2,
          shadowRadius: 2,
          shadowOffset: {
            height: -2,
            width: 1,
          },
        },
      }}
      detachInactiveScreens={false}>
      {Screens.map((item, index) => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.Component}
            options={{
              ...item?.options,
              tabBarIcon: ({ color, size, focused }) => {
                return (
                  <BT_Button
                    name={item.name}
                    focused={focused}
                    img={item.icons[0]}
                    activeImg={item.icons[1]}
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default memo(BottomTabs);

const styles = StyleSheet.create({});

type BT_ButtonProps = {
  name: string;
  focused: boolean;
  img: ImageSourcePropType;
  activeImg: ImageSourcePropType;
};

const BT_Button: React.FC<BT_ButtonProps> = ({
  focused,
  img,
  activeImg,
  name,
}) => {
  const size = 25;
  const color = focused ? Colors.primary : '#000000';

  return (
    <>
      <Image
        resizeMode='contain'
        style={[
          {
            width: size,
            height: size,
            tintColor: color,
          },
        ]}
        source={focused ? activeImg : img}
      />
      <Text style={{ fontFamily: Fonts.semiBold, fontSize: 13, color: color, textAlign: "center" }}>
        {name}
      </Text>
    </>
  );
};
