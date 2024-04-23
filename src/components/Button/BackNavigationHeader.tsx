import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import NavigationBackBtn from './NavigationBackBtn';
import FlexDirRow from '../Layouts/FlexDirRow';
import { moderateScale, Styles, SQUARE, moderateScaleVertical } from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export type BackNavigationHeaderProps = {
  title?: string;
  rImg?: ImageSourcePropType;
  onrPress?: () => void;
  leftImgColor?: string;
  onLeftPress?: () => void;
  lImg?: ImageSourcePropType
  notificationCount?: number
  hideBackBtn?: boolean
  safeArea?: boolean
};

const BackNavigationHeader: React.FC<BackNavigationHeaderProps> = ({
  title,
  rImg,
  onrPress,
  leftImgColor = "black",
  onLeftPress,
  lImg,
  notificationCount,
  hideBackBtn,
  safeArea
}) => {
  const safeAreaTop = useSafeAreaInsets().top;

  return (
    <FlexDirRow
      style={{
        alignItems: 'center', paddingVertical: title ? moderateScaleVertical(8) : moderateScaleVertical(13),
        marginTop: safeAreaTop,
      }}>

      <Animated.View entering={FadeInDown} style={{ position: 'absolute', zIndex: 10 }}>
        {!hideBackBtn && <NavigationBackBtn imgColor={leftImgColor} {...{ onLeftPress, lImg }} />}
      </Animated.View>

      <Animated.Text entering={FadeInDown.delay(50)}
        style={{
          flex: 1,
          textAlign: 'center',
          ...Styles.normalFontStyle,
          color: 'black',
          fontSize: moderateScale(18),
        }}>
        {title}
      </Animated.Text>

      {rImg && (
        <Pressable onPress={onrPress} style={{ marginRight: moderateScale(15), position: "absolute", right: 0, }}>
          {notificationCount ? <View style={{
            position: 'absolute',
            right: moderateScale(-10),
            top: moderateScale(-15),
            backgroundColor: Colors.primary,
            borderRadius: 100,
            height: moderateScale(23),
            width: moderateScale(23),
            zIndex: 99,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={[Styles.normalFontStyle, { color: "black", fontSize: moderateScale(13), }]}>
              {notificationCount}
            </Text>
          </View> : null}
          <Image
            source={rImg}
            style={{
              ...SQUARE(moderateScale(24)),
              tintColor: 'black',
              alignSelf: 'flex-end',
            }}
            resizeMode='contain'
          />
        </Pressable>
      )}

    </FlexDirRow>
  );
};

export default BackNavigationHeader;

const styles = StyleSheet.create({});
