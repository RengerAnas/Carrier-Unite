import { Image, ImageSourcePropType, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SQUARE, Styles, WIDTH, moderateScale, moderateScaleVertical } from '../../constants/Utils'
import FlexDirRow from '../Layouts/FlexDirRow'
import Flex1 from '../Layouts/Flex1'
import PrimaryBtn from '../Button/PrimaryBtn'
import Colors from '../../constants/Colors'

type Props = {
   visible?: boolean
   setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
   headingText: string
   text: string
   onAllowPress: () => void
   Img: ImageSourcePropType
   hideDenyBtn?: boolean
}

const PermissionModal = ({ visible, headingText, onAllowPress, setVisible, text, Img, hideDenyBtn }: Props) => {
   return (
      <Modal visible={visible == true} transparent>
         <Pressable
            style={[Styles.centerDivWithFlex, { backgroundColor: '#00000099' }]}
            onPress={() => !hideDenyBtn && setVisible(false)}>
            <View
               style={[
                  Styles.centerDiv,
                  {
                     backgroundColor: 'white',
                     padding: moderateScale(10),
                     borderRadius: 10,
                     width: '90%',
                     gap: moderateScaleVertical(10)
                  },
               ]}>
               <Image source={Img} style={SQUARE(WIDTH * 0.13)} />
               <Text style={Styles.heading}>{headingText}</Text>
               <Text style={Styles.normalFontStyle}>{text}</Text>
               <FlexDirRow style={{ marginTop: 10 }}>
                  <Flex1 style={{ marginRight: 5 }}>
                     <PrimaryBtn title={'Open Settings'} borderStyleBtn={Colors.primary} onPress={() => {
                        onAllowPress();
                        !hideDenyBtn && setVisible(false)
                     }} />
                  </Flex1>
                  {!hideDenyBtn && <Flex1 style={{ marginLeft: 5 }}>
                     <PrimaryBtn
                        title={'Deny'}
                        onPress={() => setVisible(false)}
                     />
                  </Flex1>}
               </FlexDirRow>
            </View>
         </Pressable>
      </Modal>
   )
}

export default PermissionModal

const styles = StyleSheet.create({})