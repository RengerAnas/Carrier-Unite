import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationProps } from '../../../Models/Navigation/NavigationModels'
import { DEVICE_TYPE, FLEX, F_Family, SQUARE, Styles, WIDTH, moderateScaleVertical } from '../../../constants/Utils'
import { NavigatorText } from '../Components/NavigatorText'
import Images from '../../../constants/Images'
import InputFields from '../../../components/InputText/InputFields'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import RadioButton from '../../../components/RadioButton'
import Flex1 from '../../../components/Layouts/Flex1'
import { useFormik } from 'formik'
import { loginSchema } from '../../../utils/schema/Auth.schema'
import { store } from '../../../Store/Store'
import { setAuthentication, setUserData, setUserToken, setUserType, userDataSelector } from '../../../Store/Data/Auth/AuthSlice'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import { capitalizeFirstLetter } from '../../../services/Validations'
import { getData } from '../../../Store/AsyncStorage/AsyncStorage'
import { FCM_TOKEN } from '../../../Store/AsyncStorage/AsyncStorage.Constant'
import Fonts from '../../../constants/Fonts'
import { useSelector } from 'react-redux'


const Login = ({ navigation }: NavigationProps<'Login'>) => {
   const userData = useSelector(userDataSelector)
   const initialValues = {
      email: '',
      password: '',
   }

   const formik = useFormik({
      initialValues,
      onSubmit: values => {
         apiWithToken(userData.userType == 1 ? ENDPOINTS.jobSeekerLogin : ENDPOINTS.recruiterLogin, 'POST', values).then((res) => {
            store.dispatch(setUserData(res.data))
            // store.dispatch(setUserToken(res.token))
            store.dispatch(setAuthentication(true))
         }).catch(err => {
            // console.log("🚀 ~ file: UserRegister.tsx:36 ~ apiWithToken ~ err:", err)
         })

      },
      validationSchema: loginSchema
   })



   return (
      <KeyboardAvoidingView style={FLEX} >
         <SafeAreaView style={[FLEX, { paddingVertical: moderateScaleVertical(20), backgroundColor: "white" }]} >
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", gap: 30, marginVertical: 40 }} >
               <Image source={Images.fullLogo} resizeMode='contain' style={SQUARE(WIDTH / 3)} />
               <Text style={[Styles.headingFontStyle, { marginBottom: moderateScaleVertical(15) }]}>{("Login")}</Text>
               <View style={{ width: '95%' }}>
                  <View style={{ marginHorizontal: -15 }}>
                     <InputFields placeholder={('Email')} {...{ formik }} keyboardType='email-address' name='email' lImg={Images.email} />
                     <InputFields placeholder={('Password')} {...{ formik }} name='password' lImg={Images.pass} rImg={Images.eye} />
                  </View>
                  <FlexDirRow style={{ marginBottom: moderateScaleVertical(35), marginTop: moderateScaleVertical(10) }}>
                     <Flex1>
                     </Flex1>
                     {/* <Text style={[Styles.normalFontStyle, { color: "red" }, F_Family(Fonts.semiBold)]} onPress={() => navigation.navigate("ForgotPassword")}>{("Forgot Password?")}</Text> */}
                  </FlexDirRow>
                  <PrimaryBtn title={('Login')} onPress={formik.handleSubmit} />
               </View>
            </ScrollView>
            <NavigatorText title={("Don’t have an account?")} pressableText={('Register')} onpress={() => navigation.navigate('Register')} />
         </SafeAreaView>
      </KeyboardAvoidingView >
   )
}

export default Login

const styles = StyleSheet.create({})