import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { setSessionField } from '../../../Redux/SessionSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Fonts from '../../../constants/Fonts'
export const TOAST = ''

const Toast = () => {
   const T = useSelector(state => state.Session[TOAST])

   const topVal = useSharedValue(-50)
   const scaleVal = useSharedValue(0)

   useEffect(() => {
      setSessionField(TOAST, false)
   }, [])

   const rStyle = useAnimatedStyle(() => {
      return {
         position: 'absolute',
         top: topVal.value,
         left: 10,
         right: 10,
         zIndex: 100,
         justifyContent: 'center',
         alignItems: 'center',
         transform: [{ scale: scaleVal.value }]
      }
   })

   useEffect(() => {
      topVal.value = withTiming(20)
      scaleVal.value = withTiming(1.1)
      setTimeout(() => {
         topVal.value = withTiming(-50)
         scaleVal.value = withTiming(0)
      }, T?.duration);
      setTimeout(() => {
      }, T?.duration + 1000);
      // }
   }, [T])

   const img = T?.color == '#6ac259' ? "https://cdn-icons-png.flaticon.com/512/845/845646.png"
      :
      T?.color == 'red' ?
         "https://cdn-icons-png.flaticon.com/512/463/463612.png"
         :
         "https://cdn-icons-png.flaticon.com/512/6897/6897039.png"


   return (
      <>
         {
            <Animated.View style={rStyle}>
               <View style={{
                  backgroundColor: '#d1d1d1',
                  elevation: 10,
                  flexDirection: 'row',
                  padding: 13,
                  borderRadius: 5,
                  borderLeftWidth: 5,
                  borderLeftColor: T?.color,

               }}>
                  <Image
                     source={{
                        uri: img
                     }}
                     style={{
                        width: 20,
                        height: 20,
                     }}
                     resizeMode="contain"
                  />
                  <Text style={{
                     color: '#000000',
                     fontSize: 16,
                     fontFamily: Fonts.bold,
                     marginLeft: 10
                  }}>
                     {T?.message}.
                  </Text>
               </View>
            </Animated.View>}
      </>

   )
}

export default Toast

const styles = StyleSheet.create({})


export const AnimatedToast = {
   Success: (message, duration = 3000) => {
      setSessionField(TOAST, { color: '#6ac259', message, duration })
   },
   Error: (message, duration = 3000) => {
      setSessionField(TOAST, { color: 'red', message, duration })
   },
   Warn: (message, duration = 3000) => {
      setSessionField(TOAST, { color: '#FFC048', message, duration })
   }
}