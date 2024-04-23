import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles} from '../../../constants/Utils';

type Props = {
  children: React.ReactNode;
};

const CenteredFlex: React.FC<Props> = ({children}) => {
  return <View style={{...Styles.centerDivWithFlex}}>{children}</View>;
};

export default CenteredFlex;

const styles = StyleSheet.create({});
