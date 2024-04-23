import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import Images from '../../../constants/Images'
import { F_SIZE, SQUARE, Styles, WIDTH } from '../../../constants/Utils'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import Colors from '../../../constants/Colors'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import moment from 'moment'
import { useIsFocused } from '@react-navigation/native'
import { useAppSelector } from '../../../Hooks/ReduxHooks'
import { navigate } from '../../../services/NavigationService'

type Props = {}

const PostedJobs = (props: Props) => {
  const [data, setData] = useState<any[]>([])
  const myId = useAppSelector(state => state.userData.data?.id)

  const isFocused = useIsFocused()

  useEffect(() => {
    apiWithToken(ENDPOINTS.getRecruiterJobs + myId, "GET", undefined).then((res) => {
      setData(res.data)
    })
  }, [isFocused])


  return (
    <ScrollView style={{ backgroundColor: "white" }} contentContainerStyle={{ flexGrow: 1 }}  >
      <BackNavigationHeader title='Manage Jobs' hideBackBtn />
      {data.length == 0 && <View style={Styles.centerDivWithFlex}>
        <Text style={Styles.headingFontStyle}>No Jobs Available</Text>
      </View>}
      {data.map((item, index) => {
        return <>
          <JobCard item={item} index={index} len={data.length} setData={setData} />
        </>
      })}
    </ScrollView >
  )
}

export default PostedJobs

const styles = StyleSheet.create({})


export const JobCard = ({ index, item, len, setData, getData }: any) => {
  const isSaved = item.isSaved
  const myId = useAppSelector(state => state.userData.data?.id)
  const [showModal, setShowModal] = useState(false)
  const isJobSeeker = useAppSelector(state => state.userData.userType) == 1

  return <Pressable onPress={() => {
    if (isJobSeeker) {
      navigate("JobDetail", { id: item.id })
    }
  }}
    style={{
      zIndex: len - index,
      padding: 10, borderColor: "lightgrey", borderWidth: 1, margin: 5, marginHorizontal: 10, borderRadius: 5
    }} key={index.toString()}>

    <FlexDirRow >
      <View style={{ borderWidth: 1, alignSelf: "flex-start", borderColor: "lightgrey", borderRadius: 5, padding: 10 }}>
        <Image source={{ uri: item.logo }} resizeMode='contain' style={SQUARE(WIDTH * 0.11)} />
      </View>

      <View style={{ padding: 10, gap: 5 }}>
        <Text style={[Styles.cardText, F_SIZE(14)]}>{item.postedBy.companyName}</Text>
        <FlexDirRow gap={5}>
          <Image source={Images.locationPin} resizeMode='contain' style={[SQUARE(20), { tintColor: "gray" }]} />
          <Text style={Styles.lightText}>{item.address}</Text>
        </FlexDirRow>
      </View>
    </FlexDirRow>

    <Text style={[Styles.cardText, F_SIZE(14), { marginVertical: 5 }]}>{item.title}</Text>

    <FlexDirRow gap={10}>
      <Text style={{ color: Colors.primary }}>{moment(item.postedOn).fromNow()}</Text>
      <Text style={{ color: 'black' }}>-</Text>
      <Text style={{ color: 'black' }}>{item.noOfVacancy} Vacancy</Text>
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
        <Text style={[Styles.normalFontStyle, { color: "black", }]}>${item.salary} per hour</Text>
      </View>

      <Pressable onPress={() => {
        if (isJobSeeker) {
          if (isSaved) {
            apiWithToken(ENDPOINTS.removeSave + item.saveId, "DELETE", undefined).then((res) => {
              getData()
            })
          } else {
            apiWithToken(ENDPOINTS.saveJob, "POST", {
              "jobId": item.id,
              "userId": myId
            }).then((res) => {
              getData()
            })
          }
        } else {
          setShowModal(!showModal)
        }
      }}>
        <Image source={isJobSeeker ? isSaved ? Images.saveActive : Images.save : Images.dots} resizeMode='contain' style={SQUARE(20)} />
      </Pressable>

      {showModal && <View style={{
        backgroundColor: "#fff", padding: 10, position: "absolute", top: 25, right: 5,
        borderRadius: 5, zIndex: 999, elevation: 10
      }}>
        <Pressable onPress={() => {
          apiWithToken(ENDPOINTS.deleteJob + item.id, "DELETE", undefined).then((res) => {
            setData((prev: any) => {
              return prev.filter((i: any) => i.id != item.id)
            })
          })
        }}>
          <FlexDirRow gap={5} style={{
            borderBottomWidth: 1, borderBottomColor: "lightgrey", paddingBottom: 5
          }}><Image source={Images.close} resizeMode='contain' style={SQUARE(20)} /><Text style={[Styles.lightText, { color: "black" }]}>Close Job</Text></FlexDirRow>
        </Pressable>

      </View>}

    </View>


  </Pressable>
}