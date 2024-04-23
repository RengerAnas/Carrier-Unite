import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { createJobSchema } from '../../../utils/schema/Job.schema'
import LabelInputField, { PropsLabelInputFieldProps } from '../../../components/InputText/LableInputField'
import MyKeyboardAvoidingScrollView from '../../../components/Scrollview/MyKeyboardAvoidingScrollView'
import Flex1 from '../../../components/Layouts/Flex1'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import { HEIGHT, SQUARE, Styles, WIDTH } from '../../../constants/Utils'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'
import MultipleSwitch from '../Components/MultipleSwitch'
import Images from '../../../constants/Images'
import ImageCropPicker from 'react-native-image-crop-picker'
import YupError from '../../../components/Text/YupError'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import { store } from '../../../Store/Store'
import { navigate } from '../../../services/NavigationService'
import { NavigationProps } from '../../../Models/Navigation/NavigationModels'

type Props = {}

export const initialValus = {
  title: "",
  description: "",
  address: "",
  salary: "",
  noOfVacancy: "",
  postedOn: "",
  type: "Part-Time",
  recruiter: "",
  logo: ""
}

const CreateJob = ({ navigation }: NavigationProps<"Create Job">) => {
  const formik = useFormik({
    initialValues: initialValus,
    onSubmit: ({ logo, ...values }) => {
      apiWithToken(ENDPOINTS.createJob, "POST", { ...values }, undefined, false, undefined,
        { name: "logo", data: [{ uri: logo }] }).then(res => {
          formik.resetForm()
          formik.setFieldValue('recruiter', store.getState().userData.data?.id);
          navigate("Posted Jobs")
        })
    },
    validationSchema: createJobSchema
  })

  const Inputs: PropsLabelInputFieldProps[] = [
    { label: 'Job Title', placeholder: 'Job Title', name: 'title' },
    { label: 'How Many Vacancy', placeholder: 'vacancy', name: 'noOfVacancy', keyboardType: 'number-pad' },
    {
      placeholder: 'DD-MM-YYY', label: 'Starting Date', name: 'postedOn',
      TextInputProps: { editable: false, onPressIn: () => showDatePicker() }

    },
    { label: 'Job Description', placeholder: 'write here', name: 'description' },
    { label: 'Address', placeholder: 'write here', name: 'address' },
    { label: 'Salary', placeholder: 'Salary Per Hour', name: 'salary', keyboardType: 'number-pad' },
  ]

  useEffect(() => {
    formik.setFieldValue('recruiter', store.getState().userData.data?.id);
  }, [])


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    hideDatePicker();
    if (moment(date).isBefore(moment())) {
      formik.setFieldError('postedOn', 'Starting date should be greater than today’s date')
    } else {
      formik.setFieldValue('postedOn', moment(date).format('YYYY-MM-DD'));
    }
  };



  return (
    <MyKeyboardAvoidingScrollView style={{ backgroundColor: "white" }}>
      <BackNavigationHeader title='Crete Job Request' hideBackBtn />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={"date"}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Flex1>
        {Inputs.map((input, index) => {
          return <>
            {input.name == 'salary' && <MultipleSwitch data={["Part-Time", "Full-Time"]} selected={formik.values.type} setSelected={(val) => {
              formik.setFieldValue('type', val)
            }} />}
            <LabelInputField {...input} key={index} {...{ formik }} />
          </>
        })}
        <Text style={[Styles.normalFontStyle, { margin: 10 }]}>Upload Logo</Text>
        <Pressable style={{ borderWidth: 1, borderStyle: "dashed", margin: 10, height: HEIGHT * 0.18, borderRadius: 10 }}
          onPress={() => {
            ImageCropPicker.openPicker({
              width: HEIGHT * 0.18,
              height: HEIGHT * 0.18,
              cropping: true,
            }).then(image => {
              formik.setFieldValue('logo', image.path)
            })
          }}
        >
          {formik.values.logo == "" ? <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Image source={Images.upload} resizeMode='contain' style={SQUARE(WIDTH * 0.1)} />
            <Text style={Styles.lightText}>
              Tap to Company Logo
            </Text>
          </View>
            : <Image source={{ uri: formik.values.logo }} resizeMode='cover' style={{ width: '100%', height: "100%" }} />
          }
        </Pressable>
        {formik.touched.logo && formik.errors.logo && <YupError err={formik.errors.logo} />}
      </Flex1>
      <PrimaryBtn title='Submit' mrHr={10} mrVr={10} onPress={formik.handleSubmit} />
    </MyKeyboardAvoidingScrollView>
  )
}

export default CreateJob

const styles = StyleSheet.create({})