import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import { BOLD, CIRCLE, F_Family, F_SIZE, SQUARE, Styles, moderateScale, moderateScaleVertical } from '../../constants/Utils'
import { LabeledDetail, RequestCardBody } from './RequestCard'
import FlexDirRow from '../Layouts/FlexDirRow'
import Images from '../../constants/Images'
import Fonts from '../../constants/Fonts'
import { useAppSelector } from '../../Hooks/ReduxHooks'
import { userDataSelector } from '../../Store/Data/Auth/AuthSlice'
import { navigate, reset } from '../../services/NavigationService'
import RatingModal from '../Modals/RatingModal'
import { t } from 'i18next'
import { driverBookingType, userBookingType } from '../../Models/Home/Order.modal'
import { ENDPOINTS, IMAGE_URL } from '../../constants/API.Constants'
import Flex1 from '../Layouts/Flex1'
import { apiWithToken } from '../../ApiService/core/ApiRequest'
import { isDriver } from '../../services/AuthService'

export type BookingType = { type: 'user', item: userBookingType, status: string } | { type: 'driver', item: driverBookingType }
type Props = {
   status: string
} & (BookingType)


const BookingCard = ({ status, item, type }: Props) => {
   const isComplete = status == t("Complete")
   const isPending = status == t("Pending")

   const handleNavigate = () => {
      // navigate("MyBookingDetail", type == 'driver' ? { item, type } : { item, type, status })
      navigate("MyBookingDetail", { order_id: item.id })
   }

   const details = {
      img: type == 'driver' ? item.user_img : item.driver_img,
      name: type == 'driver' ? item.user_name : item.driver_name,
      id: type == 'driver' ? item.user_id : item.driver_id,
      order_id: item.id,
      rated: item.rate
   }

   return (
      <Pressable style={styles.container} onPress={() => {
         if (isComplete) {
            handleNavigate()
         }
      }}>
         <RequestCardBody details={{ booking_date: item.date, booking_time: item.time, ...item }} />
         <FlexDirRow style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
            {isPending ? <Flex1 /> : <UserNameImg img={type == 'driver' ? item.user_img : item.driver_img} full_name={type == 'user' ? item.driver_name : item.user_name} />}
            <ViewDetailText {...{ isComplete, isRated: item.is_rate, details }} onPress={handleNavigate} />
         </FlexDirRow>
      </Pressable>
   )
}

export default BookingCard

const styles = StyleSheet.create({
   container: {
      borderWidth: 1, borderColor: "#F8DADA", borderRadius: 6, marginVertical: moderateScale(5), backgroundColor: "white", paddingHorizontal: moderateScale(15), paddingBottom: moderateScaleVertical(15)
   }
})


export const UserNameImg = ({ full_name, img }: { full_name: string; img: string }) => {
   const isDriver = useAppSelector(userDataSelector).userType == 2

   return <View style={{ gap: moderateScaleVertical(5) }}>
      <Text style={[Styles.normalFontStyle, { color: "#9A9A9A" }]}>{isDriver ? t("Client") : t("Driver")}</Text>
      <FlexDirRow style={{ gap: moderateScale(10) }}>
         <Image source={{ uri: IMAGE_URL + img }} resizeMode='contain' style={CIRCLE(moderateScale(25))} />
         <Text style={[Styles.normalFontStyle, F_Family(Fonts.regular), F_SIZE(14)]}>{full_name}</Text>
      </FlexDirRow>
   </View>
}

type ViewDetailTextProp = {
   isComplete?: boolean
   isRated?: boolean
   onPress?: () => void
   details?: any

}
export const ViewDetailText = ({ isComplete, isRated, onPress, details }: ViewDetailTextProp) => {
   const [visible, setVisible] = useState(false)

   const onSubmit = (val: {
      rating: number,
      review: string
   }) => {
      apiWithToken(isDriver() ? ENDPOINTS.driverRate : ENDPOINTS.userRate, 'POST', {
         ...isDriver() ? {
            user_id: details.id
         } : {
            driver_id: details.id
         },
         order_id: details.order_id,
         rate: val.rating,
         details: val.review
      }).then(() => {
         reset("My Bookings")
      })
   }

   return <FlexDirRow style={{ alignItems: "center" }}>
      <RatingModal {...{ visible, setVisible, details, onSubmit }} />
      {!isComplete || !isRated ? <>
         <Text style={[Styles.normalFontStyle, BOLD, { color: Colors.primary, marginTop: -4 }]} onPress={() => {
            if (isComplete) {
               setVisible(true)
            } else {
               onPress && onPress()
            }
         }}>{isComplete ? t("Rate Now") : t("View Detail")}</Text>
         {!isComplete && <Image source={Images.rightArrow} resizeMode='contain' style={[SQUARE(moderateScale(25)), { tintColor: Colors.primary }]} />}
      </> :
         <FlexDirRow>
            <Text style={[Styles.normalFontStyle, { marginTop: 0, includeFontPadding: false }]}>{t("Rated")} </Text>
            <Image source={Images.star} resizeMode='contain' style={SQUARE(moderateScale(15))} />
            <Text style={[Styles.normalFontStyle, { marginTop: 0, includeFontPadding: false }]}>{details.rated}</Text>
         </FlexDirRow>
      }
   </FlexDirRow >
}