import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FlexDirRow from '../Layouts/FlexDirRow'
import Images from '../../constants/Images'
import { SQUARE, moderateScale } from '../../constants/Utils'

type Props = {
   rate: number
}

const StarRating = ({ rate = -1 }: Props) => {

   return (
      <FlexDirRow>
         {new Array(5).fill('').map((item, index) => <Image source={Images.star} resizeMode='contain' style={[SQUARE(moderateScale(14)), { tintColor: rate <= index ? '#CBC9C0' : '#FCD400' }]} key={index} />)}
      </FlexDirRow>
   )
}

export default StarRating

const styles = StyleSheet.create({})