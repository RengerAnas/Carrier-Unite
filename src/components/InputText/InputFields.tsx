import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  Pressable,
  ImageStyle
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import YupError from '../Text/YupError';
import { DEVICE_TYPE, moderateScale, moderateScaleVertical } from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';


export interface InputFieldsProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e?: any) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions
  lImg?: ImageSourcePropType;
  rText?: string;
  onrPress?: () => void;
  rImg?: ImageSourcePropType;
  TextInputProps?: TextInputProps;
  lImageStyle?: ImageStyle;
  formik?: ReturnType<typeof useFormik<any>>;
  name?: string;
  error?: string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  onRImgPress?: () => void;
}

const InputFields: React.FC<InputFieldsProps> = ({
  placeholder,
  onChangeText,
  value,
  onBlur,
  secureTextEntry,
  keyboardType,
  lImg,
  rText,
  onrPress,
  rImg,
  TextInputProps,
  lImageStyle,
  formik,
  name,
  error,
  style,
  containerStyle,
  onRImgPress,
}) => {
  let isTouched: FormikTouched<any> | undefined;
  let Err: FormikErrors<any> | undefined;

  if (formik && name) {
    const { values, handleBlur, handleChange, touched, errors } = formik;
    const formikName = name;
    value = values[formikName];
    onChangeText = handleChange(formikName);
    onBlur = handleBlur(formikName);
    isTouched = touched;
    Err = errors;
  }

  const isInputError = isTouched?.[name ?? ''] && Err?.[name ?? ''];

  const withoutStyleProps = { ...TextInputProps };
  delete withoutStyleProps.style;

  const [isSecure, setIsSecure] = useState<boolean>(rImg == Images.eye)
  const [rigthImg, setRigthImg] = useState(rImg)

  if (rImg == Images.eye || rImg == Images.eyeClose) {
    onRImgPress = () => {
      setRigthImg(isSecure ? Images.eyeClose : Images.eye)
      setIsSecure(!isSecure)
    }
  }

  return (
    <View
      style={[
        {
          marginHorizontal: moderateScale(15),
          marginVertical: moderateScaleVertical(10),
        },
        style,
      ]}>
      <View
        style={[
          {
            borderWidth: 1,
            padding: DEVICE_TYPE == 'ios' ? 10 : 0,
            paddingHorizontal: moderateScale(10),
            borderRadius: 43,
            borderColor: Colors.gray,
            flexDirection: 'row',
            alignItems: 'center',
          },
          containerStyle,
        ]}>
        {lImg && (
          <Image
            source={lImg}
            resizeMode={'contain'}
            style={{
              width: moderateScale(24),
              height: moderateScale(24),
              marginRight: 10,
              tintColor: 'black',
              ...lImageStyle,
            }}
          />
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          secureTextEntry={isSecure != undefined ? isSecure : secureTextEntry}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholderTextColor={'#a1a1a1'}
          autoCapitalize='none'
          caretHidden={false}
          {...keyboardType == 'email-address' && {
            textContentType: "emailAddress",
            autoComplete: "email"
          }}
          style={[
            styles.textInputStyle,
            TextInputProps?.style,
          ]}
          {...withoutStyleProps}
        />

        {rText && (
          <TouchableOpacity onPress={onrPress}>
            <Text
              style={{
                color: Colors.primary,
                fontSize: 15,
                fontFamily: Fonts.bold,
              }}>
              {rText}
            </Text>
          </TouchableOpacity>
        )}

        {rigthImg && (
          <Pressable onPress={onRImgPress}>
            <Image
              source={rigthImg}
              style={{
                width: moderateScale(25),
                height: moderateScale(25),
                // tintColor: '',
              }}
            />
          </Pressable>
        )}
      </View>
      {isInputError && (
        <>
          <YupError err={Err?.[name ?? '']?.toString()} />
        </>
      )}
      {error && (
        <>
          <YupError err={error} />
        </>
      )}
    </View>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  textInputStyle: {
    fontFamily: Fonts.regular,
    flex: 1,
    color: 'black',
    paddingVertical: DEVICE_TYPE == 'android' ? 8 : 0,
    // padding: 0,
    fontSize: moderateScale(15),
    includeFontPadding: false,
  }
});
