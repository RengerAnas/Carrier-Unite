import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { useNetInfo } from '@react-native-community/netinfo'
import AnimatedLottieView from 'lottie-react-native'
import Fonts from '../../../constants/Fonts'

const NetworkWrapper = ({ children }) => {
   const isConnected = useNetInfo()

   const WIDTH = useWindowDimensions().width

   return (
      <View style={{ flex: 1, }}
      >
         {isConnected.isConnected ?
            children :
            <View style={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
            }}>
               <AnimatedLottieView source={require("./noInternet.json")} autoPlay loop style={{
                  width: WIDTH,
                  height: WIDTH,
               }} />
               <Text style={{
                  fontSize: 25,
                  color: 'black',
                  fontFamily: Fonts.bold,
                  textAlign: 'center',
                  marginHorizontal: 15
               }}>{"No Internet Connection!\nPlease Connect To The Internet First"}</Text>
            </View>
         }
      </View>
   )
}

export default NetworkWrapper

const styles = StyleSheet.create({})