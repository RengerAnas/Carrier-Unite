import { View, Text } from 'react-native'
import React, { useState } from 'react'
import LabelInputField, { PropsLabelInputFieldProps } from '../../../components/InputText/LableInputField'
import { HEIGHT, Styles } from '../../../constants/Utils'
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import Flex1 from '../../../components/Layouts/Flex1'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import { useFormik } from 'formik'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { loginSchema, registerSchema } from '../../../utils/schema/Auth.schema'
import { ENDPOINTS } from '../../../constants/API.Constants'
import { store } from '../../../Store/Store'
import { setAuthentication, setUserData, setUserType } from '../../../Store/Data/Auth/AuthSlice'
import Switch from '../../../components/Switch/Switch'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Props = {}

const JobSeekerRegister = (props: Props) => {
  const Inputs: PropsLabelInputFieldProps[] = [
    { placeholder: 'Full Name', label: 'Full Name', name: 'name' },
    { placeholder: 'Phone Number', label: 'Phone Number', name: 'mobileNumber', keyboardType: 'phone-pad' },
    { placeholder: 'Email', label: 'Email', name: 'email' },
    { placeholder: 'Address', label: 'Address', name: 'address' },
    { placeholder: 'Job Title', label: 'Job Title', name: 'jobTitle' },
    {
      placeholder: 'Birthdate', label: 'dd-mm-yyyy', name: 'dateOfBirth',
      TextInputProps: { editable: false, onPressIn: () => showDatePicker() }

    },
    {
      placeholder: 'Description', label: 'Description', TextInputProps: {
        multiline: true,
        style: { height: HEIGHT * 0.2, textAlignVertical: 'top' }
      }, name: 'description'
    },
    { placeholder: 'Password', label: 'Password', name: 'password' },
  ]

  const formik = useFormik({
    initialValues: {
      "name": "",
      "mobileNumber": "",
      "email": "",
      "password": "",
      "address": "",
      "gender": "1",
      "dateOfBirth": "",
      "jobTitle": "",
      "description": ""
    },
    onSubmit: values => {
      apiWithToken(ENDPOINTS.JobSeekerRegister, 'POST', values).then((res) => {
        store.dispatch(setUserData(res.data))
        store.dispatch(setAuthentication(true))
      }).catch(err => {
        // console.log("🚀 ~ file: UserRegister.tsx:36 ~ apiWithToken ~ err:", err)
      })
    },
    validationSchema: registerSchema
  })

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    hideDatePicker();
    formik.setFieldValue('dateOfBirth', moment(date).format('YYYY-MM-DD'));
  };



  return (
    <MyKeyboardAvoidingScrollView>
      <BackNavigationHeader title='Register' safeArea />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={"date"}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Flex1>
        {Inputs.map((input, index) => {
          if (input.name == 'address') {
            return <>
              <Text style={{
                ...Styles.normalFontStyle,
                fontSize: 15,
                color: "black",
                paddingHorizontal: 15,
                marginVertical: 10
              }}>Gender</Text>
              <Switch title1={"Male"} title2={"Female"}
                SwitchVal={formik.values.gender == "1" ? "Male" : "Female"}
                setSwitchVal={(val: string) => {
                  formik.setFieldValue("gender", val == "Male" ? "1" : "0")
                }} />
              <LabelInputField {...input} key={index} {...{ formik }} />
            </>
          }
          return <LabelInputField {...input} key={index} {...{ formik }} />
        })}
      </Flex1>
      <PrimaryBtn title='Register' mrHr={10} mrVr={10} onPress={formik.handleSubmit} />
    </MyKeyboardAvoidingScrollView>
  )
}

export default JobSeekerRegister