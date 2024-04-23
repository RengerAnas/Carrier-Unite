import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { BOLD, CIRCLE, F_Family, F_SIZE, SQUARE, Styles, WIDTH, moderateScale, moderateScaleVertical } from '../../constants/Utils'
import Images from '../../constants/Images'
import FlexDirRow from '../Layouts/FlexDirRow'
import Flex1 from '../Layouts/Flex1'
import DisplayRating from '../Ratings/DisplayRating'
import Fonts from '../../constants/Fonts'
import PrimaryBtn from '../Button/PrimaryBtn'
import { navigate } from '../../services/NavigationService'
import { t } from 'i18next'
import { driverHomeType } from '../../Models/Home/Order.modal'
import { ENDPOINTS, IMAGE_URL } from '../../constants/API.Constants'
import moment from 'moment'
import { apiWithToken } from '../../ApiService/core/ApiRequest'
import { getRoomId } from '../../views/private/Messages/Services/Message.services'
import { store } from '../../Store/Store'

type Props = {
   item: driverHomeType
   callBack?: () => void
}

const RequestCard = ({ item, callBack }: Props) => {
   const driver_id = store.getState().userData.data?.id as number

   return (
      <Pressable style={styles.container} onPress={() => navigate("OrderDetail", { ...item, driver_id })}>
         <RequestCardHeader details={item} chatDetails={{
            ...item,
            order_id: item.id,
            driver_id
         }} />
         <RequestCardBody details={item} />
         <RequestCardFooter id={item?.id} {...{ callBack }} />
      </Pressable>
   )
}

export default RequestCard

const styles = StyleSheet.create({
   container: {
      borderWidth: 1, borderColor: Colors.gray,
      borderRadius: 4,
      padding: moderateScale(15), marginVertical: moderateScaleVertical(5),
      gap: moderateScaleVertical(10)
   },
   label: {
      ...Styles.normalFontStyle,
      ...F_SIZE(13)
   }
})

//! Header
type RequestCardHeaderProps = {
   isBgDark?: boolean
   fromProfile?: boolean
   isSelecting?: boolean
   isSelected?: boolean
   onSelect?: () => void
   details: {
      profile_pic: string;
      full_name: string;
      city: string;
      rate: number;
      reviews: number;
      public_id: string;
   },
   chatDetails?: {
      booking_date: string
      booking_time: string
      pick_address: string
      order_id: number
      driver_id: number;
   }
}

export const RequestCardHeader = ({ isBgDark, fromProfile, details, chatDetails, isSelecting, isSelected, onSelect }: RequestCardHeaderProps) => {
   const roomId = getRoomId(details?.public_id)
   const labelColor = isBgDark ? "#9d9d9d" : "#565656"

   let Icon = fromProfile ? Images.editProfile : Images.Message
   let avatarSize = fromProfile ? WIDTH * .2 : WIDTH * 0.23
   let nameSize = fromProfile ? 24 : 18

   if (isSelecting) {
      Icon = isSelected ? Images.radioChecked : Images.radioUnChecked
      avatarSize = WIDTH * .15
      nameSize = 14
   }



   return <FlexDirRow style={{ gap: moderateScale(15), }} >
      <Image source={{ uri: IMAGE_URL + details?.profile_pic }} resizeMode='contain' style={[CIRCLE(avatarSize), fromProfile && { borderWidth: 3, borderColor: "white" }]} />
      <Flex1>
         <Flex1 style={{ justifyContent: fromProfile ? "center" : "space-between", }}>
            <View>
               <Text style={[Styles.heading, isBgDark && { color: 'white' }, { fontSize: moderateScale(nameSize) }]}>{details?.full_name}</Text>
               {!fromProfile && <Text style={[styles.label, { color: labelColor }]}>{details?.city}</Text>}
            </View>
            <FlexDirRow style={{ gap: moderateScale(8), marginVertical: moderateScaleVertical(7) }}>
               <DisplayRating rate={details?.rate} />
               <Text style={[styles.label, { color: labelColor }]}>({details?.reviews}) {t("Reviews")}</Text>
            </FlexDirRow>
         </Flex1>
      </Flex1>
      <Pressable onPress={() => {
         if (chatDetails) {
            navigate("Chat", { roomId, isOffer: true, details: chatDetails })
         } else if (fromProfile) {
            navigate("EditProfile")
         } else {
            onSelect && onSelect()
         }
      }} style={{ alignSelf: fromProfile ? "center" : "flex-start" }}>
         <Image source={Icon} resizeMode='contain' style={[SQUARE(moderateScale(25)), {}, isBgDark && { tintColor: 'white' }]} />
      </Pressable>
   </FlexDirRow>
}

//! Body
type RequestCardBodyProps = {
   smallSize?: boolean
   details: {
      booking_date: string;
      booking_time: string;
      pick_address: string;
   }
}
export const RequestCardBody = ({ smallSize, details }: RequestCardBodyProps) => {
   return <View>
      <FlexDirRow style={{}}>
         <Flex1>
            <LabeledDetail {...{ smallSize }} label={t('Date')} detail={details?.booking_date} />
         </Flex1>
         <Flex1>
            <LabeledDetail {...{ smallSize }} label={t('Time')} detail={moment(details?.booking_time, "HH:mm").format("hh:mm A")} />
         </Flex1>
      </FlexDirRow>
      <LabeledDetail label={t('Pickup')} {...{ smallSize }} detail={details?.pick_address} />
   </View>
}

//! Footer
type footerType = {
   id: number;
   callBack?: () => void
}

export const RequestCardFooter = ({ id, callBack }: footerType) => {

   const orderAction = (type: "1" | "2") => {
      apiWithToken(ENDPOINTS.driverReqAction, 'POST', { order_id: id, order_action: type }).then(() => callBack && callBack())
   }

   return <FlexDirRow style={{ gap: moderateScale(15) }}>
      <Flex1><PrimaryBtn title={t('Decline')} pdVr={7} bgColor='black' onPress={() => orderAction('2')} /></Flex1>
      <Flex1><PrimaryBtn title={t('Accept')} pdVr={7} onPress={() => orderAction('1')} /></Flex1>
   </FlexDirRow>
}

type LabeledDetailProps = {
   label?: string
   detail?: string
   boldDetail?: boolean
   smallSize?: boolean
}
export const LabeledDetail = ({ detail, label, boldDetail, smallSize }: LabeledDetailProps) => {
   return <View style={{ marginVertical: moderateScaleVertical(8), gap: 5 }}>
      <Text style={[Styles.normalFontStyle, smallSize && F_SIZE(13), { color: "#9A9A9A" }]}>{label}</Text>
      <Text style={[Styles.normalFontStyle, smallSize && F_SIZE(13), F_Family(boldDetail ? Fonts.bold : Fonts.regular)]}>{detail}</Text>
   </View>
}
