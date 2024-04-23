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
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import YupError from '../Text/YupError';
import { DEVICE_TYPE, Styles, moderateScale, moderateScaleVertical } from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
import { MapKey } from '../../constants/API.Constants';



export interface MyAutoPlacesProps {
   placeholder: string;
   onChangeText: (text: string) => void;
   onLatLongChange?: (lat: number | string, long: number | string) => void;
   label?: string;
   rLabel?: string;
   lImg?: ImageSourcePropType;
   rText?: string;
   onrPress?: () => void;
   rImg?: ImageSourcePropType;
   TextInputProps?: TextInputProps;
   lImageStyle?: ImageStyle;
   error?: boolean | string;
   style?: ViewStyle;
   containerStyle?: ViewStyle;
   onRImgPress?: () => void;
   googlePlacesProps?: Omit<GooglePlacesAutocompleteProps, 'placeholder'>,
   setOnChangeDefault?: boolean,
   hideLabel?: boolean
   float?: boolean
}

const MyAutoPlaces: React.FC<MyAutoPlacesProps> = ({
   placeholder,
   onChangeText,
   lImg,
   rText,
   onrPress,
   rImg,
   TextInputProps,
   lImageStyle,
   style,
   containerStyle,
   googlePlacesProps,
   error,
   onRImgPress,
   onLatLongChange,
   label, rLabel,
   setOnChangeDefault,
   hideLabel,
   float
}) => {
   const [autoPlace, setAutoPlace] = useState("")
   const withoutStyleProps = { ...TextInputProps };
   delete withoutStyleProps.style;

   const ref = useRef<GooglePlacesAutocompleteRef>(null)

   useEffect(() => {
      ref.current?.setAddressText(TextInputProps?.defaultValue || "")
   }, [])

   const query = useRef({
      key: MapKey,
      ...(googlePlacesProps?.query ?? {})
   }).current;

   useMemo(() => {
      onLatLongChange && onLatLongChange("", "")
      setOnChangeDefault && onChangeText(autoPlace)
   }, [autoPlace])

   return (
      <Pressable
         style={[
            {
               marginTop: hideLabel ? 0 : 10,
            },
         ]}
         onPress={TextInputProps?.onPressIn}>

         {!hideLabel && <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
            <Text
               style={{
                  ...Styles.normalFontStyle,
                  fontSize: 15,
                  color: "black",
                  paddingHorizontal: 15,
               }}>
               {label}
            </Text>
            {rLabel && (
               <Text
                  style={{
                     ...Styles.normalFontStyle,
                     fontSize: moderateScale(14),
                     color: 'orange',
                     paddingHorizontal: 15,
                  }}>
                  {rLabel}
               </Text>
            )}
         </View>}

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
                     padding: moderateScale(10),
                     // padding: DEVICE_TYPE == 'ios' ? 10 : 0,
                     // paddingHorizontal: moderateScale(10),
                     borderRadius: 4,
                     borderColor: '#EBEBEB',
                     flexDirection: 'row',
                     alignItems: 'center',
                     zIndex: 999
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

               <GooglePlacesAutocomplete
                  ref={ref}
                  {...{ placeholder }}
                  keyboardShouldPersistTaps='always'
                  styles={{
                     listView: !float ? {} : {
                        position: 'absolute',
                        zIndex: 99,
                        elevation: 3,
                        top: 40,
                        left: moderateScale(-10),
                        right: moderateScale(-10),
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: "#EBEBEB",
                     }
                  }}
                  textInputProps={{
                     placeholderTextColor: '#a1a1a1',
                     style: [{
                        ...styles.textInputStyle,
                     }, TextInputProps?.style],
                     onChangeText: setAutoPlace,
                     ...withoutStyleProps,
                  }}
                  fetchDetails
                  onPress={(data, details = null) => {
                     setAutoPlace(data.description)
                     onChangeText(data.description)
                     if (details && onLatLongChange) onLatLongChange(details?.geometry?.location?.lat, details?.geometry?.location?.lng)
                  }}
                  enablePoweredByContainer={false}
                  {...googlePlacesProps}
                  query={query}
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

               {rImg && (
                  <Pressable onPress={onRImgPress}>
                     <Image
                        source={rImg}
                        style={{
                           width: moderateScale(25),
                           height: moderateScale(25),
                           // tintColor: '',
                        }}
                     />
                  </Pressable>
               )}
            </View>

            {error && (
               <>
                  <YupError err={error as string} />
               </>
            )}

         </View>
      </Pressable>

   );
};

export default memo(MyAutoPlaces);

const styles = StyleSheet.create({
   textInputStyle: {
      fontFamily: Fonts.regular,
      flex: 1,
      color: 'black',
      // paddingVertical: DEVICE_TYPE == 'android' ? 8 : 0,
      padding: 0,
      fontSize: moderateScale(15),
      includeFontPadding: false,
   }
});


