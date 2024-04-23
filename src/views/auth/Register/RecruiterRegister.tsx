import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import Flex1 from '../../../components/Layouts/Flex1'
import LabelInputField, { PropsLabelInputFieldProps } from '../../../components/InputText/LableInputField'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import { HEIGHT } from '../../../constants/Utils'
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView'
import { useFormik } from 'formik'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import { store } from '../../../Store/Store'
import { setAuthentication, setUserData } from '../../../Store/Data/Auth/AuthSlice'
import { registerSchema } from '../../../utils/schema/Auth.schema'
import { stringValidation } from '../../../utils/schema/validation.schema'

type Props = {}

const RecruiterRegister = (props: Props) => {
  const Inputs: PropsLabelInputFieldProps[] = [
    { placeholder: 'Company Name', label: 'Company Name', name: 'companyName' },
    { placeholder: 'Phone Number', label: 'Phone Number', name: 'mobileNumber', keyboardType: 'phone-pad' },
    { placeholder: 'Email', label: 'Email', name: 'email' },
    { placeholder: 'Address', label: 'Address', name: 'address' },
    {
      placeholder: 'Description', label: 'Description', name: 'description',
      TextInputProps: {
        multiline: true,
        style: { height: HEIGHT * 0.2, textAlignVertical: 'top' }
      }
    },
    { placeholder: 'Password', label: 'Password', name: 'password' },
  ]


  const formik = useFormik({
    initialValues: {
      "companyName": "",
      "mobileNumber": "",
      "email": "",
      "password": "",
      "address": "",
      "description": ""
    },
    onSubmit: values => {
      apiWithToken(ENDPOINTS.recruiterRegister, 'POST', values).then((res) => {
        store.dispatch(setUserData(res.data))
        // store.dispatch(setUserToken(res.token))
        store.dispatch(setAuthentication(true))
      }).catch(err => {
        // console.log("🚀 ~ file: UserRegister.tsx:36 ~ apiWithToken ~ err:", err)
      })
    },
    validationSchema: registerSchema().omit(["dateOfBirth", "gender", "jobTitle", "name"]).shape({
      companyName: stringValidation("Company Name"),
    })
  })


  return (
    <MyKeyboardAvoidingScrollView>
      <BackNavigationHeader title='Register' safeArea />
      <Flex1>
        {Inputs.map((input, index) => {
          return <LabelInputField {...input} key={index} {...{ formik }} />
        })}
      </Flex1>
      <PrimaryBtn title='Register' mrHr={10} mrVr={10} onPress={formik.handleSubmit} />
    </MyKeyboardAvoidingScrollView>
  )
}

export default RecruiterRegister

const styles = StyleSheet.create({})