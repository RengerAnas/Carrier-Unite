import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { moderateScale, moderateScaleVertical } from '../../constants/Utils';
import Fonts from '../../constants/Fonts';
import { SQUARE, CIRCLE, Styles } from '../../constants/Utils';
import Colors from '../../constants/Colors';


export type PrimaryBtnProps = {
  title: string;
  onPress?: () => void;
  pdVr?: number;
  mrVr?: number;
  mrHr?: number;
  mrTp?: number;
  mrBm?: number;
  bgColor?: string;
  color?: string;
  rImg?: ImageSourcePropType;
  rImgTintColor?: string;
  lImg?: ImageSourcePropType;
  lImgTintColor?: string;
  fontFam?: string;
  fSize?: number;
  pdHr?: number;
  borderColor?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  rCount?: number;
  borderStyleBtn?: string;
  secondLayout?: boolean;
  borderRadius?: number;
};

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  title,
  bgColor = Colors.primary,
  pdVr = 13,
  mrVr,
  mrHr,
  mrBm,
  mrTp,
  color = 'white',
  onPress,
  rImg,
  rImgTintColor,
  fontFam = Fonts.bold,
  fSize = 16,
  pdHr = 10,
  borderColor = 'transparent',
  isLoading = false,
  isDisabled,
  lImg,
  lImgTintColor,
  rCount,
  borderStyleBtn,
  secondLayout,
  borderRadius = 45,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled || isLoading}
      onPress={onPress}
      style={[{
        backgroundColor:
          isDisabled && bgColor != 'transparent' ? '#c4c4c4' : bgColor,
        padding: 10,
        borderRadius,
        marginHorizontal: mrHr && moderateScale(mrHr),
        marginVertical: mrVr && moderateScaleVertical(mrVr),
        marginTop: mrTp && moderateScaleVertical(mrTp),
        marginBottom: mrBm && moderateScaleVertical(mrBm),
        paddingVertical: moderateScaleVertical(pdVr),
        paddingHorizontal: pdHr && moderateScale(pdHr),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor:
          isDisabled && borderColor != 'transparent' ? '#939393' : borderColor,
        ...(!!borderStyleBtn && {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: borderStyleBtn,
        }),
      }, secondLayout && {
        paddingVertical: moderateScaleVertical(8),
        borderRadius: 4
      }]}>

      <>
        {rImg && (
          <Image
            source={rImg}
            style={{ tintColor: rImgTintColor, ...SQUARE(25) }}
            resizeMode={'contain'}
          />
        )}
        <Text

          style={[{
            color: isDisabled
              ? bgColor == 'transparent'
                ? '#939393'
                : 'white'
              : color,
            fontSize: moderateScale(fSize),
            fontFamily: fontFam,
            textAlign: 'center',
            marginTop: 0,
            marginLeft: rImg ? 10 : 0,
            marginRight: lImg ? 10 : 0,
            includeFontPadding: false,
            ...(!!borderStyleBtn && {
              color: borderStyleBtn,
            }),
          }, secondLayout && { fontSize: moderateScale(14.5) }]}>
          {isLoading ? " " : title}
        </Text>
        {isLoading && <ActivityIndicator color={borderStyleBtn || 'white'} size={fSize + 4.5} style={{ position: 'absolute', }} />}

        {lImg && (
          <View>
            {rCount ? (
              <View
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  top: -5,
                  right: -10,
                  backgroundColor: 'white',
                  ...CIRCLE(20),
                  ...Styles.centerDiv,
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    color: 'black',
                    // marginTop: -2,
                    includeFontPadding: false,
                  }}>
                  {rCount.toString()}
                </Text>
              </View>
            ) : null}
            <Image
              source={lImg}
              style={{ tintColor: lImgTintColor, ...SQUARE(25) }}
              resizeMode={'contain'}
            />
          </View>
        )}
      </>

    </TouchableOpacity>
  );
};

export default PrimaryBtn;

const styles = StyleSheet.create({});
