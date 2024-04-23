import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavHeader from '../../../../components/Headers/NavHeader'
import Flex1 from '../../../../components/Layouts/Flex1'
import MyKeyboardAvoidingScrollView from '../../../../components/Scrollview/MyKeyboardAvoidingScrollView'
import PrimaryBtn from '../../../../components/Button/PrimaryBtn'
import Images from '../../../../constants/Images'
import { MV, SQUARE, Styles, WIDTH } from '../../../../constants/Utils'
import InputFields from '../../../../components/InputText/InputFields'
import { useFormik } from 'formik'
import { changePassSchema } from '../../../../utils/schema/Auth.schema'
import { apiWithToken } from '../../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../../constants/API.Constants'
import { store } from '../../../../Store/Store'
import { goBack } from '../../../../services/NavigationService'
import BackNavigationHeader from '../../../../components/Button/BackNavigationHeader'

type Props = {}

const ChangePass = (props: Props) => {
   const isJobSeeker = store.getState().userData.userType == 1
   const myId = store.getState().userData.data?.id

   const formik = useFormik({
      initialValues: {
         old_password: "",
         new_password: "",
         confirm_password: ""
      },
      validationSchema: changePassSchema(),
      onSubmit: ({ confirm_password, ...values }) => {
         const params = {
            oldPassword: values.old_password,
            newPassword: values.new_password,
         }

         apiWithToken((isJobSeeker ? ENDPOINTS.jobSeekerUpdatePass : ENDPOINTS.recruiterUpdatePass) + myId, 'PUT', params)
            .then(res => {
               goBack()
            }).catch(err => {
               console.log("🚀 ~ file: UserRegister.tsx:36 ~ apiWithToken ~ err:", err)
            })
      }
   })


   return (
      <Flex1 style={{ backgroundColor: "white" }}>
         <BackNavigationHeader title={('Change Password')} />
         <MyKeyboardAvoidingScrollView>
            <Image source={Images.changePass} resizeMode='contain' style={[SQUARE(WIDTH * 0.64), MV(15), { alignSelf: "center" }]} />
            <InputFields placeholder={('Current Password')} {...{ formik }} name='old_password' rImg={Images.eye} lImg={Images.pass} />
            <InputFields placeholder={('New Password')}  {...{ formik }} name='new_password' rImg={Images.eye} lImg={Images.pass} />
            <InputFields placeholder={('Confirm New Password')}  {...{ formik }} name='confirm_password' rImg={Images.eye} lImg={Images.pass} />
         </MyKeyboardAvoidingScrollView>
         <SafeAreaView>
            <PrimaryBtn title={('Reset Password')} mrHr={15} mrVr={15} onPress={formik.handleSubmit} />
         </SafeAreaView>
      </Flex1>
   )
}

export default ChangePass

const styles = StyleSheet.create({})