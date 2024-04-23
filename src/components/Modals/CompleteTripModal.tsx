import { Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Flex1 from '../Layouts/Flex1'
import { BOLD, CENTERED, F_Family, Styles, T_CENTER, WIDTH, moderateScale, moderateScaleVertical } from '../../constants/Utils'
import FlexDirRow from '../Layouts/FlexDirRow'
import PrimaryBtn from '../Button/PrimaryBtn'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { t } from 'i18next'

type Props = {
   visible: boolean
   setVisible: React.Dispatch<React.SetStateAction<boolean>>
   onConfirm?: (code: number) => void
   title?: string
   desc?: string
   pinCount?: number
}

const CompleteTripModal = ({ setVisible, visible, onConfirm,
   pinCount = 4, title = t("Are you completed this trip?"), desc = t("Please enter your client 4 digit code.") }: Props) => {
   const [code, setCode] = useState('')
   async function confirmCode() {
      onConfirm && onConfirm(Number(code))
   }
   const otpRef = useRef<any>(null);

   useEffect(() => {
      if (visible) {
         setTimeout(() => otpRef.current.focusField(0), 500);
      }
   }, [visible]);


   return (
      <Modal {...{ visible }} onRequestClose={() => setVisible(false)} transparent>
         <Flex1 style={{ backgroundColor: "#000000a3", ...CENTERED }}>
            <View style={{ backgroundColor: "white", borderRadius: 10, padding: moderateScale(15), width: '90%', ...Styles.centerDiv }}>
               <Text style={[Styles.normalFontStyle, BOLD]}>{title}</Text>
               <Text style={[Styles.normalFontStyle, F_Family(Fonts.regular)]}>{desc}</Text>
               <OTPInputView
                  ref={otpRef}
                  style={{ width: '100%', height: moderateScaleVertical(100) }}
                  {...{ pinCount }}
                  code={code}
                  onCodeChanged={setCode}
                  autoFocusOnLoad={false}
                  codeInputFieldStyle={styles.underlineStyleBase}
                  codeInputHighlightStyle={styles.underlineStyleHighLighted}
                  inputsWrapperStyles={{
                     justifyContent: "center",
                     gap: moderateScale(10)
                  }}
               />
               <FlexDirRow style={{ gap: moderateScale(10) }}>
                  <Flex1><PrimaryBtn title={t('Cancel')} pdVr={12} bgColor='black' onPress={() => setVisible(false)} /></Flex1>
                  <Flex1><PrimaryBtn title={t('Submit')} pdVr={12} onPress={confirmCode} /></Flex1>
               </FlexDirRow>
               <Text style={[Styles.normalFontStyle, { color: Colors.primary, marginVertical: moderateScaleVertical(10) }]}>{t("Resend Code")}</Text>
            </View>
         </Flex1>
      </Modal>
   )
}

export default CompleteTripModal

const styles = StyleSheet.create({
   underlineStyleBase: {
      width: WIDTH / 9,
      height: WIDTH / 9,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: Colors.gray,
      fontFamily: Fonts.semiBold,
      fontSize: moderateScale(17),
      color: 'black',
   },

   underlineStyleHighLighted: {
      borderColor: 'black',
   },
})