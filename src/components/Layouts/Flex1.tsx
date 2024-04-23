import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  style?: ViewStyle | TextStyle | ImageStyle;
};

const Flex1 = (props: Props) => {
  return <View style={{flex: 1, ...props.style}}>{props.children}</View>;
};

export default Flex1;

const styles = StyleSheet.create({});
