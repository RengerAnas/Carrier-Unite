import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import Flex1 from '../../../components/Layouts/Flex1'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import { F_SIZE, SQUARE, Styles } from '../../../constants/Utils'
import { store } from '../../../Store/Store'
import Images from '../../../constants/Images'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import Colors from '../../../constants/Colors'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import { navigate } from '../../../services/NavigationService'

type Props = {}

const HomeRecruiter = ({ }: Props) => {
  const [data, setData] = useState<any[]>([])
  const jobId = store.getState().userData.data?.id

  const isFocused = useIsFocused()

  const getData = () => {
    apiWithToken(ENDPOINTS.jobRequest + jobId, "GET", undefined).then((res) => {
      setData(res.data)
    })
  }

  useEffect(() => {
    if (isFocused) {
      getData()
    }
  }, [isFocused])

  return (
    <Flex1 style={{ backgroundColor: "white" }}>
      <BackNavigationHeader hideBackBtn title='Home' />
      {data.length == 0 && <View style={Styles.centerDivWithFlex}>
        <Text style={Styles.headingFontStyle}>No Jobs Request Available</Text>
      </View>}
      {data.map((item, index) => {
        return <>
          <View style={{
            borderRadius: 5, borderWidth: 1, borderColor: "#dbdbdb", margin: 10, padding: 10
          }}>
            <FlexDirRow>
              <View style={{ borderWidth: 1, padding: 10, alignSelf: "flex-start", borderRadius: 5, borderColor: "#dbdbdb" }}>
                <Image source={{ uri: item.job.logo }} resizeMode={'contain'} style={SQUARE(70)} />
              </View>

              <View style={{ padding: 10, gap: 5, flex: 1 }}>
                <Text style={[Styles.cardText, F_SIZE(14)]}>{item.jobSeeker.name}</Text>
                <FlexDirRow gap={5}>
                  <Image source={Images.locationPin} resizeMode='contain' style={[SQUARE(20), { tintColor: "gray" }]} />
                  <Text style={Styles.lightText}>{item?.job?.address}</Text>
                </FlexDirRow>
              </View>

              <Pressable onPress={() => {
                navigate("JobSeekerDetail", { id: item.jobSeeker.id, requestId: item.id })
              }}>
                <Text style={[Styles.normalFontStyle, { color: Colors.primary }]}>View</Text>
              </Pressable>
            </FlexDirRow>

            <View style={{ marginHorizontal: 5, marginVertical: 5 }}>
              <Text style={Styles.lightText}>Applied for</Text>
              <Text style={[Styles.cardText, F_SIZE(14)]}>{item?.job?.title}</Text>
            </View>

            {item.actionTaken ? <Text>{item.accepted ? "Accepted" : "Rejected"}</Text> : <FlexDirRow gap={10} style={{ marginVertical: 5 }}>
              <Flex1>
                <PrimaryBtn title='Reject' borderStyleBtn={Colors.primary} pdVr={10}
                  onPress={() => {
                    jobRequestAction(item.id, false).then(getData)
                  }} />
              </Flex1>
              <Flex1>
                <PrimaryBtn title='Accept' pdVr={10}
                  onPress={() => {
                    jobRequestAction(item.id, true).then(getData)
                  }}
                />
              </Flex1>
            </FlexDirRow>}

          </View >
        </>
      })}
    </Flex1 >
  )
}

export default HomeRecruiter

const styles = StyleSheet.create({})

export const jobRequestAction = (id: any, action: boolean) => {
  return apiWithToken(ENDPOINTS.jobRequestAction + id, 'PUT', {
    "accepted": action
  })
}
