import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import Fonts from '../../constants/Fonts';

interface yupErrorType {
  err?: string;
  styles?: TextStyle;
}
const YupError = ({ err, styles }: yupErrorType) => {

  return (
    <Text
      style={{
        color: 'red',
        paddingTop: 10,
        fontFamily: Fonts.semiBold,
        fontSize: 15,
        ...styles,
      }}>
      {err}
    </Text>
  );
};

export default YupError;
