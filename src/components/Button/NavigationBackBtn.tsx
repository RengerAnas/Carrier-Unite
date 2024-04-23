import {
  ColorValue,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';



import { useNavigation } from '@react-navigation/native';
import { DEVICE_TYPE, moderateScale } from '../../constants/Utils';
import Images from '../../constants/Images';
import { SQUARE } from '../../constants/Utils';
import Animated, { FadeInDown } from 'react-native-reanimated';

type Props = {
  imgColor?: ColorValue;
  onLeftPress?: () => void;
  lImg?: ImageSourcePropType
};

const NavigationBackBtn = ({ onLeftPress, imgColor, lImg = Images.backArr }: Props) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        onLeftPress ? onLeftPress() : navigation.goBack();
      }}
      hitSlop={10}
      style={{
        marginVertical: DEVICE_TYPE == 'android' ? 10 : 0,
        marginHorizontal: DEVICE_TYPE == 'android' ? 15 : 10,
      }}>
      <Image
        source={lImg}
        resizeMode={'contain'}
        style={{ ...SQUARE(moderateScale(24)), tintColor: imgColor }}
      />
    </Pressable>
  );
};

export default NavigationBackBtn;

const styles = StyleSheet.create({});
