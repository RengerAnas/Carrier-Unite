import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { SQUARE, Styles, moderateScale } from '../../constants/Utils'

type RadioButtonType = {
   text: string
   selected: boolean
   setSelected: Dispatch<SetStateAction<boolean>>
}

const RadioButton = ({ selected, setSelected, text }: RadioButtonType) => {
   return (
      <Pressable onPress={() => setSelected(!selected)} style={{ flexDirection: "row", alignItems: "center", gap: moderateScale(10) }}>
         <View
            style={{
               ...SQUARE(moderateScale(23)),
               borderRadius: 4,
               borderWidth: 1, borderColor: "#a6a6a6"
            }}
         />
         <Text style={Styles.normalFontStyle}>{text}</Text>
      </Pressable>
   )
}

export default RadioButton

const styles = StyleSheet.create({})