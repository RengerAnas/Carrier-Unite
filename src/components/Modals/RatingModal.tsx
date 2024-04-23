import { Image, KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { F, HEIGHT, SQUARE, Styles, WIDTH, moderateScale } from '../../constants/Utils';
import Images from '../../constants/Images';
import LabelInputField from '../InputText/LableInputField';
import PrimaryBtn from '../Button/PrimaryBtn';
import Fonts from '../../constants/Fonts';
import RatingSelector from '../Ratings/RatingSelector';
import { t } from 'i18next';
import { IMAGE_URL } from '../../constants/API.Constants';

type Props = {
   visible: boolean,
   setVisible: Dispatch<SetStateAction<boolean>>,
   details: {
      img: string,
      name: string
   }
   onSubmit: (val: {
      rating: number,
      review: string
   }) => void
}

const RatingModal = ({ visible, setVisible, details, onSubmit: handleSubmit }: Props) => {
   const [selectedRating, setSelectedRating] = useState(-1);
   const [review, setReview] = useState("")

   const Scale = useSharedValue(0);

   const rStyle = useAnimatedStyle(() => {
      return {
         transform: [{ scale: Scale.value }],
      };
   });

   if (visible) {
      Scale.value = withSpring(1);
   }

   useEffect(() => {
      if (!visible) return
      setSelectedRating(-1)
      setReview("")
   }, [visible])


   const onSubmit = () => {
      handleSubmit({
         rating: selectedRating + 1,
         review: review.trim()
      })
      Scale.value = withSpring(0);
      setTimeout(() => {
         setVisible(false);
      }, 200);
   }

   return (
      <Modal visible={visible} onRequestClose={() => setVisible(false)} transparent>
         <Pressable
            // onPress={() => setVisible(false)}
            style={{
               backgroundColor: '#000000db',
               ...Styles.centerDivWithFlex,
               padding: moderateScale(10),
               paddingTop: moderateScale(10),
            }}>
            <Animated.View style={rStyle}>
               <KeyboardAvoidingView style={styles.container} behavior="position">
                  <Text style={{ ...styles.headingFont, marginTop: moderateScale(10) }}>
                     {t("Rate Now")}
                  </Text>

                  <Pressable
                     style={{ position: 'absolute', right: 10, top: 10, zIndex: 999 }}
                     onPress={() => {
                        Scale.value = withSpring(0);
                        setTimeout(() => {
                           setVisible(false);
                        }, 200);
                     }}>
                     <Image source={Images.close} resizeMode='contain' style={SQUARE(F(25))} />
                  </Pressable>

                  {/* profileImage */}
                  <View
                     style={{
                        borderRadius: WIDTH,
                        overflow: 'hidden',
                        ...Styles.centerDiv,
                        marginTop: moderateScale(15),
                     }}>
                     <Image
                        source={{ uri: IMAGE_URL + details.img }}
                        style={{ ...SQUARE(WIDTH / 4.5), borderRadius: WIDTH / 2 }}
                     />
                  </View>

                  {/* name  */}
                  <Text style={{ ...styles.headingFont, fontSize: moderateScale(15) }}>{details.name}</Text>

                  <RatingSelector
                     selectedRating={selectedRating}
                     onPress={val => setSelectedRating(val)}
                  />

                  <LabelInputField
                     placeholder={t('Write here')}
                     label={t('Review')}
                     value={review}
                     TextInputProps={{
                        maxLength: 500,
                        multiline: true,
                        style: {
                           height: HEIGHT * 0.12,
                           textAlignVertical: "top"
                        }
                     }}
                     onChangeText={setReview}
                  />

                  <View style={{ margin: 8, marginTop: 15 }}>
                     <PrimaryBtn title={t('Submit')} pdVr={13} onPress={onSubmit} isDisabled={!selectedRating || !review.trim()} />
                  </View>

               </KeyboardAvoidingView>
            </Animated.View>
         </Pressable>
      </Modal>
   )
}

export default RatingModal

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      padding: 10,
      width: WIDTH - 30,
      margin: 15,
      borderRadius: 10,
      overflow: 'hidden',
   },
   headingFont: {
      ...Styles.heading,
      fontFamily: Fonts.bold,
      fontSize: moderateScale(20),
      textAlign: 'center',
   },
})


