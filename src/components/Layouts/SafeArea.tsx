import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { DEVICE_TYPE } from '../../../constants/Utils';
import { useGetStatusBarHeight } from '../../../hooks/dimentionHook';

type Props = {};

const SafeArea = (props: Props) => {
   const statusBarHeight = useGetStatusBarHeight()

   return <View style={{ height: DEVICE_TYPE == 'ios' ? statusBarHeight : 0 }} />;
};

export default SafeArea;

const styles = StyleSheet.create({});
