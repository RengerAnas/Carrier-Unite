import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { moderateScale } from '../../constants/Utils';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | TextStyle | ImageStyle;
  gap?: number
};

const FlexDirRow: React.FC<Props> = ({ children, style, gap }) => {
  return <View style={{ flexDirection: 'row', alignItems: "center", gap: gap ? moderateScale(gap) : undefined, ...style }}>{children}</View>;
};

export default FlexDirRow;
