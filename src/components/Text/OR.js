import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';

const OR = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          padding: 10,
          backgroundColor: 'white',
          fontFamily: Fonts.bold,
          color: Colors.Natural.Natural600,
          fontSize: 12,
        }}>
        OR
      </Text>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: 1,
          backgroundColor: Colors.Natural.Natural300,
          zIndex: -1,
        }}
      />
    </View>
  );
};

export default OR;

const styles = StyleSheet.create({});
