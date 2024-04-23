import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CIRCLE, F_SIZE, SQUARE, Styles, WIDTH, moderateScale, moderateScaleVertical } from '../../constants/Utils'
import Images from '../../constants/Images'
import FlexDirRow from '../Layouts/FlexDirRow'
import Flex1 from '../Layouts/Flex1'
import DisplayRating from '../Ratings/DisplayRating'
import PrimaryBtn from '../Button/PrimaryBtn'
import Colors from '../../constants/Colors'
import { navigate } from '../../services/NavigationService'
import { t } from 'i18next'
import { homeDriverDataType } from '../../Models/Home/Home.modal'
import { IMAGE_URL } from '../../constants/API.Constants'
import { getRoomId } from '../../views/private/Messages/Services/Message.services'

type Props = {
   secondLayout?: boolean
   driverDetails: homeDriverDataType
}

const DriverCard = ({ secondLayout, driverDetails }: Props) => {
   const roomId = getRoomId(driverDetails.public_id)

   const paramData = { id: driverDetails.id, tokens: driverDetails.device_token }

   return (
      <Pressable style={[styles.container, secondLayout && styles.secondLayout]}
         onPress={() => { navigate("DriverProfile", paramData) }}>
         <FlexDirRow gap={15} >
            <Image source={{ uri: IMAGE_URL + driverDetails.profile_pic }} resizeMode='contain' style={CIRCLE(WIDTH * 0.25)} />
            <Flex1 style={{ gap: moderateScaleVertical(10) }}>
               <View>
                  <Text style={Styles.heading}>{driverDetails?.full_name}</Text>
                  <Text style={Styles.lightText}>{driverDetails?.city}</Text>
               </View>
               <FlexDirRow style={{ gap: moderateScale(8), marginVertical: moderateScaleVertical(7) }}>
                  <DisplayRating rate={driverDetails?.rate} />
                  <Text style={[styles.label, { color: "#565656" }]}>({driverDetails?.reviews}) {t("Reviews")}</Text>
               </FlexDirRow>
            </Flex1>
         </FlexDirRow>
         <FlexDirRow gap={10} style={{ marginTop: moderateScaleVertical(10) }}>
            <Flex1><PrimaryBtn pdVr={9} fSize={15} title={t('Message')} bgColor='black'
               onPress={() => navigate("Chat", { roomId })} /></Flex1>
            <Flex1><PrimaryBtn pdVr={9} fSize={15} title={t('Send Request')} onPress={() => navigate("SendOffer", paramData)} /></Flex1>
         </FlexDirRow>
      </Pressable>
   )
}

export default DriverCard

const styles = StyleSheet.create({
   container: {
      marginVertical: moderateScale(10),
      marginHorizontal: moderateScale(5),
      backgroundColor: "white", borderRadius: 6, padding: moderateScale(15), width: WIDTH * 0.87, elevation: 5, shadowOpacity: 0.1
   },
   secondLayout: {
      elevation: 0,
      shadowOpacity: 0,
      width: undefined,
      borderWidth: 1,
      borderColor: Colors.gray
   },
   label: {
      ...Styles.normalFontStyle,
      ...F_SIZE(13)
   }
})