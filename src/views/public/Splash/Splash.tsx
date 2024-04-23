import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Images from '../../../constants/Images'
import { SQUARE, Styles, WIDTH } from '../../../constants/Utils'

type Props = {}

const Splash = (props: Props) => {
   return (
      <View style={[Styles.centerDivWithFlex, { backgroundColor: "white", gap: 20 }]}>
         <Image source={Images.fullLogo} style={SQUARE(WIDTH / 3)} resizeMode='contain' />
         <Text style={Styles.headingFontStyle}>Career Unite</Text>
      </View>
   )
}

export default Splash

const styles = StyleSheet.create({})