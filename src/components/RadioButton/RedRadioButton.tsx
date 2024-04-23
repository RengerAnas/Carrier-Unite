import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { moderateScale, SQUARE, Styles } from '../../constants/Utils'
import Images from '../../constants/Images'

type RadioButtonType = {
   text: string
   selected: string
   setSelected: (str: string) => void
}

const RedRadioButton = ({ selected, setSelected, text }: RadioButtonType) => {
   return (
      <Pressable onPress={() => setSelected(text)} style={{ flexDirection: "row", alignItems: "center", gap: moderateScale(10) }}>
         <Image
            source={selected == text ? Images.radioChecked : Images.radioUnChecked}
            style={{
               ...SQUARE(moderateScale(26)),
            }}
            resizeMode='contain'
         />
         <Text style={[Styles.normalFontStyle, { marginTop: -4 }]}>{text}</Text>
      </Pressable>
   )
}

export default RedRadioButton

const styles = StyleSheet.create({})