import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Flex1 from '../../../components/Layouts/Flex1'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import Images from '../../../constants/Images'
import Colors from '../../../constants/Colors'
import { F_SIZE, MV, SQUARE, Styles, WIDTH } from '../../../constants/Utils'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import moment from 'moment'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import { useAppSelector } from '../../../Hooks/ReduxHooks'
import { NavigationProps } from '../../../Models/Navigation/NavigationModels'

type Props = {}

const JobDetail = ({ route, navigation }: NavigationProps<"JobDetail">) => {
  const isFromAppliedJobs = route.params?.isFromAppliedJobs
  const jobId = route.params?.id
  const myId = useAppSelector(state => state.userData.data?.id)

  const [data, setData] = useState<any>()
  // const isSaved = route.params?.isSaved
  // const savedId = route.params?.savedId


  const getData = () => {
    apiWithToken(ENDPOINTS.getSingleJob + jobId, "GET", undefined).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Flex1 style={{ backgroundColor: "white" }}>
        <BackNavigationHeader title={'Job Details'} />

        <View style={{ paddingHorizontal: 15 }}>

          <View style={{
            alignItems: "center",
            borderBottomWidth: 1, paddingBottom: 20, borderColor: "#EBEBEB",
            marginBottom: 20
          }}>
            <View style={{
              borderWidth: 1, borderRadius: 10, borderColor: "#EBEBEB", alignSelf: "center", marginVertical: 10, padding: 10
            }}>
              <Image source={{ uri: data?.logo }} resizeMode='contain' style={SQUARE(WIDTH * 0.25)} />
            </View>

            <Text style={[Styles.cardText, F_SIZE(14)]}>{data?.postedBy?.companyName}</Text>
            <FlexDirRow gap={5}>
              <Image source={Images.locationPin} resizeMode='contain' style={[SQUARE(20), { tintColor: "gray" }]} />
              <Text style={Styles.lightText}>{data?.address}</Text>
            </FlexDirRow>

          </View>
          <Text style={[Styles.cardText, F_SIZE(14)]}>{data?.title}</Text>
          <FlexDirRow gap={10} style={{ marginTop: 10, marginBottom: 5 }}>
            <Text style={{ color: Colors.primary }}>{moment(data?.postedOn).fromNow()}</Text>
            <Text style={{ color: 'black' }}>-</Text>
            <Text style={{ color: 'black' }}>{data?.noOfVacancy} Vacancy</Text>
          </FlexDirRow>

          <View style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <View style={{
              backgroundColor: "#EFEFEF",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 100,
              alignSelf: "flex-start"
            }}>
              <Text style={[Styles.normalFontStyle, { color: "black", }]}>${data?.salary} per hour</Text>
            </View>

            {/* {isSaved != undefined && <Pressable onPress={() => {
              if (isSaved) {
                apiWithToken(ENDPOINTS.removeSave + data?.saveId, "DELETE", undefined).then((res) => {
                  getData()
                })
              } else {
                apiWithToken(ENDPOINTS.saveJob, "POST", {
                  "jobId": jobId,
                  "userId": myId
                }).then((res) => {
                  getData()
                })
              }
            }}>
              <Image source={isSaved ? Images.saveActive : Images.save} resizeMode='contain' style={SQUARE(20)} />
            </Pressable>} */}
          </View>

          {!isFromAppliedJobs && <PrimaryBtn title='Apply' mrVr={15}
            onPress={() => {
              apiWithToken(ENDPOINTS.createJobRequest, "POST", {
                jobSeekerId: myId,
                jobId: jobId
              }).then(() => {
                navigation.goBack()
              })
            }}
          />}

          <View style={{
            borderTopWidth: 1, marginTop: 20, borderColor: "#EBEBEB",
          }}>
            <Text style={[Styles.subHeading, F_SIZE(20), MV(10)]}>Job Description</Text>
            <Text style={Styles.lightText}>{data?.description}</Text>
          </View>
        </View>
      </Flex1>
    </ScrollView>
  )
}

export default JobDetail

const styles = StyleSheet.create({})