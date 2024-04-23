import { Image, StyleSheet, Text, TextStyle, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker, { DropDownPickerProps, ValueType } from 'react-native-dropdown-picker'
import { F_Family, HEIGHT, SQUARE, Styles, moderateScale, moderateScaleVertical } from '../../constants/Utils'
import Colors from '../../constants/Colors'
import Images from '../../constants/Images'
import { Dropdown } from 'react-native-element-dropdown'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'
import Fonts from '../../constants/Fonts'
import { FormikErrors, FormikTouched, useFormik } from 'formik'
import YupError from '../Text/YupError'

export type ItemType = { label: string, value: string | number }

export interface DropDownProps {
   label: string
   items: ItemType[]
   value?: string
   setValue?: React.Dispatch<React.SetStateAction<string>>
   placeholder?: string
   placeholderStyle?: TextStyle
   textStyle?: TextStyle
   name?: string
   formik?: ReturnType<typeof useFormik<any>>;
   error?: string;

}
const DropDown = ({ label, items, setValue, value, placeholder, placeholderStyle, textStyle, formik, name, error }: DropDownProps) => {
   let isTouched: FormikTouched<any> | undefined;
   let Err: FormikErrors<any> | undefined;

   if (formik && name) {
      const { values, touched, errors } = formik;
      const formikName = name;
      value = values[formikName];
      isTouched = touched;
      Err = errors;
   }

   const onChange = (item: ItemType) => {
      setValue && setValue(item.value?.toString());
      if (formik && name) {
         formik.setFieldValue(name, item.value?.toString())
      }
   }

   return (
      <View style={{ marginVertical: moderateScaleVertical(8), gap: moderateScaleVertical(10) }}>
         <Text style={Styles.normalFontStyle}>{label}</Text>
         <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={[Styles.normalFontStyle, { color: "#8a8a8a", }, F_Family(Fonts.regular), placeholderStyle]}
            selectedTextStyle={[Styles.normalFontStyle, textStyle]}
            itemTextStyle={[Styles.normalFontStyle, textStyle, { color: "#4f4f4f", }]}
            data={items}
            maxHeight={HEIGHT * 0.2}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            {...{ value }}
            onChange={onChange}
            renderRightIcon={() => (<>
               <Image source={Images.downArr} resizeMode='contain' style={SQUARE(moderateScale(27))} />
            </>)}
         />

         {isTouched?.[name ?? ''] && Err?.[name ?? ''] && (
            <>
               <View style={{ marginTop: moderateScaleVertical(-15) }}>
                  <YupError err={Err?.[name ?? '']?.toString()} />
               </View>

            </>
         )}
         {error && (
            <>
               <View style={{ marginTop: moderateScaleVertical(-15) }}>
                  <YupError err={error} />
               </View>
            </>
         )}

      </View>
   )
}

export default DropDown

const styles = StyleSheet.create({
   dropdown: {
      borderWidth: 1,
      paddingHorizontal: moderateScale(10),
      borderColor: Colors.gray,
      borderRadius: 4,
      paddingVertical: moderateScaleVertical(5),
   },
   icon: {
      marginRight: 15,
   },
   label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
   },
   placeholderStyle: {
      fontSize: 16,
   },

})