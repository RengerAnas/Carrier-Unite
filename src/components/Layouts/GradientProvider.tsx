import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../constants/Colors';
import {useGetStatusBarHeight} from '../../../hooks/dimentionHook';
import {DEVICE_TYPE} from '../../../constants/Utils';

type Props = {
  children?: React.ReactNode;
  colors?: string[];
  locations?: number[];
  angle?: number;
  style?: ViewStyle | TextStyle | ImageStyle;
  secondStyle?: Boolean;
};

const GradientProvider: React.FC<Props> = ({
  children,
  colors = [Colors.primaryYellow, Colors.primarylightBlue, Colors.primaryBlue],
  locations = [0.1, 0.4, 0.8],
  angle = 200,
  style,
  secondStyle = false,
}) => {
  const GradientProps = secondStyle
    ? {
        locations: [0.06, 0.5],
        colors: [Colors.primaryYellow, Colors.primaryBlue],
        angle: 220,
      }
    : {
        locations: locations,
        colors: colors,
        angle: angle,
      };
  const paddingTop =
    DEVICE_TYPE == 'android' ? useGetStatusBarHeight() : undefined;
  return (
    <LinearGradient
      style={{flex: 1, paddingTop, ...style}}
      {...GradientProps}
      useAngle={true}>
      {children}
    </LinearGradient>
  );
};

export default GradientProvider;

const styles = StyleSheet.create({});
