import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const HideStatusbar = (props: Props) => {
  return <StatusBar translucent={true} backgroundColor={'transparent'} />;
};

export default HideStatusbar;

const styles = StyleSheet.create({});
