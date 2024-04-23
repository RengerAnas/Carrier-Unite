import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Styles, moderateScaleVertical } from '../../../constants/Utils'
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';


interface NavigatorText {
   title: string;
   pressableText?: string;
   onpress?: () => void;
   color?: string
}

export const NavigatorText: React.FC<NavigatorText> = ({
   title,
   onpress,
   pressableText,
   color = "black"
}) => {


   return (
      <View
         style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: moderateScaleVertical(10)
         }}>
         <Text
            style={{
               ...Styles.normalFontStyle,
               color,
            }}>
            {title}
         </Text>
         <TouchableOpacity onPress={onpress}>
            <Text
               style={{
                  ...Styles.normalFontStyle,
                  color: Colors.primary,
                  fontFamily: Fonts.bold,
               }}> {pressableText}</Text>
         </TouchableOpacity>
      </View>
   );
};
