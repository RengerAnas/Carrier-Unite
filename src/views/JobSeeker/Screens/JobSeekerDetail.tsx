import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Flex1 from '../../../components/Layouts/Flex1'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import { useAppSelector } from '../../../Hooks/ReduxHooks'
import Colors from '../../../constants/Colors'
import { F_SIZE, SQUARE, Styles } from '../../../constants/Utils'
import { userData } from '../../../Store/Data/Auth/AuthSlice'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import Images from '../../../constants/Images'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import { NavigationProps } from '../../../Models/Navigation/NavigationModels'
import { jobRequestAction } from '../../Recruiter/Components/HomeRecruiter'

type Props = {}

const JobSeekerDetail = ({ navigation, route }: NavigationProps<"JobSeekerDetail">) => {
  const id = route.params.id
  const requestId = route.params.requestId
  const [data, setData] = useState<userData['data']>()


  useEffect(() => {
    apiWithToken(ENDPOINTS.jobGetSingleUser + id, "GET", undefined).then((res) => {
      setData(res.data)
    })
  }, [])


  return (<>
    <Flex1 style={{ backgroundColor: "white" }}>
      <BackNavigationHeader title='Applicant Details' />
      <View style={{
        backgroundColor: Colors.primary,
        padding: 15, borderRadius: 10, margin: 10, marginVertical: 20, gap: 5
      }}>
        <Text style={[Styles.normalFontStyle, { color: "white" }, F_SIZE(16)]}>{data?.name}</Text>
        <Text style={[Styles.lightText, { color: "#ffffff" }]}>{data?.jobTitle}</Text>
      </View>

      <View style={{
        borderWidth: 1, borderRadius: 5, borderColor: "#dbdbdb", margin: 10
      }}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#dbdbdb" }}>
          <Text style={Styles.normalFontStyle}>Contact Information</Text>
        </View>

        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#dbdbdb", backgroundColor: "#F9FBFF", gap: 10 }}>
          <FlexDirRow gap={5}>
            <Image source={Images.locationPin} resizeMode='contain' style={[SQUARE(25), { tintColor: "gray" }]} />
            <Text style={[Styles.lightText, F_SIZE(14)]}>{data?.address}</Text>
          </FlexDirRow>
          <FlexDirRow gap={5}>
            <Image source={Images.mobile} resizeMode='contain' style={[SQUARE(25), { tintColor: "gray" }]} />
            <Text style={[Styles.lightText, F_SIZE(14)]}>{data?.mobileNumber}</Text>
          </FlexDirRow>
          <FlexDirRow gap={5}>
            <Image source={Images.email} resizeMode='contain' style={[SQUARE(25), { tintColor: "gray" }]} />
            <Text style={[Styles.lightText, F_SIZE(14)]}>{data?.email}</Text>
          </FlexDirRow>
        </View>
      </View>


      <View style={{
        borderWidth: 1, borderRadius: 5, borderColor: "#dbdbdb", margin: 10
      }}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#dbdbdb" }}>
          <Text style={Styles.normalFontStyle}>Description</Text>
        </View>

        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#dbdbdb", backgroundColor: "#F9FBFF", gap: 10 }}>
          <Text style={[Styles.lightText, F_SIZE(14)]}>{data?.description}</Text>
        </View>
      </View>


    </Flex1>
    <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
      <FlexDirRow gap={20}>
        <Flex1>
          <PrimaryBtn title='Reject' borderStyleBtn={Colors.primary} pdVr={10} onPress={() => {
            jobRequestAction(requestId, false)
          }} />
        </Flex1>
        <Flex1>
          <PrimaryBtn title='Accept' pdVr={10}
            onPress={() => {
              jobRequestAction(requestId, true)
            }} />
        </Flex1>
      </FlexDirRow>
    </View>
  </>
  )
}

export default JobSeekerDetail

const styles = StyleSheet.create({})