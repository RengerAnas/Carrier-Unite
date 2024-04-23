import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BOLD, FLEX, F_SIZE, HEIGHT, SQUARE, Styles, moderateScale } from '../../constants/Utils'
import Colors from '../../constants/Colors'
import Images from '../../constants/Images'
import Animated, { FadeInUp } from 'react-native-reanimated'

type Props = {
   title: string
   onPress?: () => void
   image?: ImageSourcePropType
   index?: number
}

const AuthButton = ({ title, onPress, image, index }: Props) => {

   return (
      <Animated.View entering={FadeInUp.delay(index ? index * 150 : 0)} >
         <Pressable style={styles.container} {...{ onPress }}>
            {image && <Image source={image} style={[styles.leftImage]} resizeMode='contain' />}
            <Text style={[Styles.subHeading, F_SIZE(24), BOLD, FLEX, { marginTop: -6 }]}>{title}</Text>
            <Image source={Images.backArr} style={[styles.arrow]} resizeMode='contain' />
         </Pressable>
      </Animated.View>
   )
}

export default AuthButton

const styles = StyleSheet.create({
   container: {
      height: HEIGHT / 8.5,
      backgroundColor: "white",
      borderRadius: 6,
      flexDirection: "row",
      padding: moderateScale(20),
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#2B71F8"
   },
   arrow: {
      transform: [{ rotateZ: '180deg' }],
      ...SQUARE(moderateScale(25)),
      tintColor: Colors.primary
   },
   leftImage: {
      ...SQUARE(moderateScale(35)),
      tintColor: Colors.primary,
      marginRight: moderateScale(20)
   }
})