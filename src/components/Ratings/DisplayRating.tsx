import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlexDirRow from '../Layouts/FlexDirRow'
import { BOLD, F_SIZE, SQUARE, Styles, moderateScale } from '../../constants/Utils'
import Images from '../../constants/Images'

type Props = {
  rate?: number | string
}

const DisplayRating = ({ rate = 4.2 }: Props) => {
  return (
    <FlexDirRow style={{ backgroundColor: "#FEE24C", borderRadius: 4, paddingHorizontal: moderateScale(5), paddingVertical: moderateScale(4), }}>
      <Image source={Images.star} resizeMode='contain' style={{ ...SQUARE(moderateScale(14)) }} />
      <Text style={[Styles.normalFontStyle, F_SIZE(12), BOLD, { includeFontPadding: false, }]}>{rate}</Text>
    </FlexDirRow>
  )
}

export default DisplayRating

const styles = StyleSheet.create({})