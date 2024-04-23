import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Images from '../../constants/Images'
import { F_SIZE, MV, SQUARE, Styles, WIDTH } from '../../constants/Utils'
import LottieView from 'lottie-react-native'
import { t } from 'i18next'

type Props = {
   secondLayout?: boolean
   title?: string
}

const NoResult = ({ secondLayout, title = t("You have no request yet") }: Props) => {
   return (
      <View style={[Styles.centerDivWithFlex, MV(25)]}>
         {!secondLayout ? <Image source={Images.noResult} style={{ width: WIDTH / 1.8, height: WIDTH / 2 }} resizeMode='contain' />
            :
            <>
               <LottieView source={Images.noResultLottie} resizeMode='contain' style={{ width: '100%', height: WIDTH / 2 }} autoPlay loop={false} />
            </>
         }
         <Text style={[Styles.headingFontStyle, F_SIZE(21)]}>{title}</Text>
      </View>
   )
}

export default NoResult

const styles = StyleSheet.create({})