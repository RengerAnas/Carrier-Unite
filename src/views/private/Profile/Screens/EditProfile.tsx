import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import Flex1 from '../../../../components/Layouts/Flex1'
import { HEIGHT, Styles, moderateScale } from '../../../../constants/Utils'
import LabelInputField, { PropsLabelInputFieldProps } from '../../../../components/InputText/LableInputField'
import { useAppDispatch, useAppSelector } from '../../../../Hooks/ReduxHooks'
import { setUserData, userDataSelector } from '../../../../Store/Data/Auth/AuthSlice'
import MyKeyboardAvoidingScrollView from '../../../../components/Scrollview/MyKeyboardAvoidingScrollView'
import PrimaryBtn from '../../../../components/Button/PrimaryBtn'
import { useFormik } from 'formik'
import { registerSchema, } from '../../../../utils/schema/Auth.schema'
import BackNavigationHeader from '../../../../components/Button/BackNavigationHeader'
import { stringValidation } from '../../../../utils/schema/validation.schema'
import { apiWithToken } from '../../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../../constants/API.Constants'
import { goBack } from '../../../../services/NavigationService'
import moment from 'moment'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Switch from '../../../../components/Switch/Switch'

type Props = {}

const EditProfile = (props: Props) => {
   const user = useAppSelector(userDataSelector)
   const userData = user.data
   const isJobSeeker = user.userType === 1
   const dispatch = useAppDispatch()

   const formik = useFormik({
      initialValues: {

         ...isJobSeeker ? {
            "name": userData?.name,
            "dateOfBirth": userData?.dateOfBirth,
            "gender": userData?.gender == true as any || userData?.gender == "1" ? "1" : "0",
            "jobTitle": userData?.jobTitle
         } : { "companyName": userData?.companyName },

         "mobileNumber": userData?.mobileNumber,
         "email": userData?.email,
         "address": userData?.address,
         "description": userData?.description
      },
      validationSchema: isJobSeeker ? registerSchema().omit(['password']) : registerSchema().omit(["dateOfBirth", "gender", "jobTitle", "name", "password"]).shape({
         companyName: stringValidation("Company Name"),
      }),
      onSubmit: ({ ...rest }) => {
         const params = { ...rest } as any
         if (isJobSeeker) {
            params.gender = parseInt(params.gender)
         }
         apiWithToken((isJobSeeker ? ENDPOINTS.jobSeekerUpdateProfile : ENDPOINTS.recruiterUpdateProfile) + userData?.id, 'PUT', params).then((res) => {
            dispatch(setUserData({ ...userData, ...rest } as any))
            goBack()
         })
      }
   })

   const name: PropsLabelInputFieldProps = isJobSeeker ? {
      placeholder: 'Name', label: 'Name', name: 'name'
   } : { placeholder: 'Company Name', label: 'Company Name', name: 'companyName' }

   const otherInputs: PropsLabelInputFieldProps[] = isJobSeeker ? [
      { placeholder: 'Job Title', label: 'Job Title', name: 'jobTitle' },
      {
         placeholder: 'Birthdate', label: 'dd-mm-yyyy', name: 'dateOfBirth',
         TextInputProps: { editable: false, onPressIn: () => showDatePicker() }

      },
   ] : []

   const Inputs: PropsLabelInputFieldProps[] = [
      name,
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
      ...otherInputs
   ]



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



   const onSave = () => {
      formik.handleSubmit()
   }

   return (
      <MyKeyboardAvoidingScrollView keyboardShouldPersistTaps='handled'>
         <Flex1 style={{ backgroundColor: "white" }}>
            <BackNavigationHeader title={("Edit Profile")} />
            <DateTimePickerModal
               isVisible={isDatePickerVisible}
               mode={"date"}
               onConfirm={handleConfirm}
               onCancel={hideDatePicker}
               maximumDate={new Date()}
            />
            <View style={styles.bodyContainer}>
               <View style={{ marginHorizontal: -15 }}>
                  {
                     Inputs.map((item, index) => {
                        if (item.name == 'address' && isJobSeeker) {
                           return <>
                              <Text style={{
                                 ...Styles.normalFontStyle,
                                 fontSize: 15,
                                 color: "black",
                                 paddingHorizontal: 15,
                                 marginVertical: 10
                              }}>Gender</Text>
                              <Switch title1={"Male"} title2={"Female"}
                                 SwitchVal={formik.values?.["gender" as "email"] == "1" ? "Male" : "Female"}
                                 setSwitchVal={(val: string) => {
                                    formik.setFieldValue("gender", val == "Male" ? "1" : "0")
                                 }} />
                              <LabelInputField {...item} key={index} {...{ formik }} />
                           </>
                        }
                        return <View key={item.placeholder}>
                           <LabelInputField {...item} {...{ formik }} />
                        </View>
                     })}
               </View>
               <PrimaryBtn title={("Save")} mrVr={25} onPress={onSave} />
            </View>
         </Flex1>
      </MyKeyboardAvoidingScrollView>
   );
}

export default EditProfile

const styles = StyleSheet.create({
   bodyContainer: {
      padding: moderateScale(15)
   }
})