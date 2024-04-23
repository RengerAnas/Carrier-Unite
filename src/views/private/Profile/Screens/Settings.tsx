import { Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import NavHeader from '../../../../components/Headers/NavHeader'
import Images from '../../../../constants/Images'
import FlexDirRow from '../../../../components/Layouts/FlexDirRow'
import Flex1 from '../../../../components/Layouts/Flex1'
import { BOLD, SQUARE, Styles, moderateScale, moderateScaleVertical } from '../../../../constants/Utils'
import Colors from '../../../../constants/Colors'
import { NavigationProps } from '../../../../Models/Navigation/NavigationModels'
import { useAppDispatch, useAppSelector } from '../../../../Hooks/ReduxHooks'
import { setSettings, userDataSelector } from '../../../../Store/Data/Auth/AuthSlice'
import { LANGUAGES, LAN_CODES } from '../../../auth/languageSelect/LanguageSelect'
import { useAppTranslation } from '../../../../Hooks/LocalizationHook'
import { apiWithToken } from '../../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../../constants/API.Constants'
import { store } from '../../../../Store/Store'
import PrimaryBtn from '../../../../components/Button/PrimaryBtn'

type Props = NavigationProps<'Settings'>

const Settings = ({ navigation }: Props) => {
   const userData = useAppSelector(userDataSelector)
   const lan = userData.lng
   const selectedLanguage = LANGUAGES[LAN_CODES.indexOf(lan)]

   const initialData = {
      "email_ntf": userData.data?.email_ntf,
      "sms_ntf": userData.data?.sms_ntf,
      "Language": selectedLanguage
   }

   const [data, setData] = useState(initialData)

   const updateSettings = () => {
      apiWithToken(ENDPOINTS.updateSetting, 'POST', {
         "email_ntf": `${data.email_ntf}`,
         "sms_ntf": `${data.sms_ntf}`,
         "Language": selectedLanguage
      }).then(res => {
         store.dispatch(setSettings({
            email_ntf: res.data.email_ntf == 'True',
            sms_ntf: res.data.sms_ntf == 'True',
            Language: res.data.Language,
         }))
         console.log({
            email_ntf: res.data.email_ntf == 'True',
            sms_ntf: res.data.sms_ntf == 'True',
            Language: res.data.Language,

         });

         navigation.goBack()
      })
   }


   const { t } = useAppTranslation()


   return (
      <Flex1 style={{ backgroundColor: "white" }}>
         <Flex1>
            <NavHeader title={t('Settings')} />
            <ListComponent title={t('Email Notification')} selected={data.email_ntf}
               setSelected={() => setData(pre => ({ ...pre, email_ntf: !pre.email_ntf }))} />
            <ListComponent title={t('SMS Notification')} selected={data.sms_ntf}
               setSelected={() => setData(pre => ({ ...pre, sms_ntf: !pre.sms_ntf }))}
            />
            <ListComponent title={t('Language')} rText={selectedLanguage} onPress={() => navigation.navigate("LanguageSettings", data)} />
         </Flex1>
         <SafeAreaView style={{ padding: moderateScale(15) }}>
            <PrimaryBtn title={t('Save')} onPress={updateSettings} isDisabled={
               initialData.email_ntf == data.email_ntf &&
               initialData.sms_ntf == data.sms_ntf
            } />
         </SafeAreaView>
      </Flex1>
   )
}

export default Settings

const styles = StyleSheet.create({})

type ListComponentProp = {
   title: string
   rText?: string
   onPress?: () => void
   selected?: boolean
   setSelected?: () => void

}
export const ListComponent = ({ title, rText, onPress, selected, setSelected }: ListComponentProp) => {
   return <Pressable style={{ borderBottomWidth: 1, borderColor: Colors.gray, padding: moderateScaleVertical(15) }} {...{ onPress }}>
      <FlexDirRow>
         <Flex1><Text style={[Styles.cardText, BOLD]} >{title}</Text></Flex1>
         {rText ?
            <FlexDirRow>
               <Text style={[Styles.normalFontStyle, { marginTop: -4, color: Colors.primary }]}>{rText}</Text>
               <Image source={Images.downArr} resizeMode='contain' style={[SQUARE(moderateScale(25)), { transform: [{ rotateZ: '-90deg' }] }]} />
            </FlexDirRow> : <Switch value={selected} onChange={setSelected} />}
      </FlexDirRow>
   </Pressable>
}