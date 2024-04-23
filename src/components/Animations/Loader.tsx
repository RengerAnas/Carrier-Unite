import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { SQUARE, Styles, WIDTH } from '../../constants/Utils'
import LottieView from 'lottie-react-native'
import Images from '../../constants/Images'

type Props = {
   visible: boolean
   setVisible?: Dispatch<SetStateAction<boolean>>
}


const Loader = ({ setVisible, visible }: Props) => {
   return (
      <Modal {...{ visible }} onRequestClose={() => { setVisible && setVisible(false) }} transparent >
         <View style={{ backgroundColor: "#00000092", ...Styles.centerDivWithFlex }}>
            <View style={{
               backgroundColor: "#ffffffff",
               borderRadius: WIDTH,
            }}>
               <LottieView source={Images.Loader} autoPlay loop style={[SQUARE(WIDTH * 0.27)]} />
            </View>
         </View>
      </Modal >
   )
}

export default Loader

const styles = StyleSheet.create({})