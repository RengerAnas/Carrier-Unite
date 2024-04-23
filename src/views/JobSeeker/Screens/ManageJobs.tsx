import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Flex1 from '../../../components/Layouts/Flex1'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import Images from '../../../constants/Images'
import { F_SIZE, SQUARE, Styles } from '../../../constants/Utils'
import { useIsFocused } from '@react-navigation/native'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import { JobCard } from '../../Recruiter/Screens/PostedJobs'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import { navigate } from '../../../services/NavigationService'
import { store } from '../../../Store/Store'

type Props = {}

const ManageJobs = (props: Props) => {
  const [data, setData] = useState<any[]>([])
  const myId = store.getState().userData.data?.id
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      apiWithToken(ENDPOINTS.jobSeekerJobRequest + myId, "GET", undefined).then((res) => {
        setData(res.data.map((i: any) => i.job))
      })
    }
  }, [isFocused])

  return (
    <Flex1 style={{ backgroundColor: "white" }}>
      <BackNavigationHeader hideBackBtn title='Applied Jobs' />
      {data.length == 0 && <View style={Styles.centerDivWithFlex}>
        <Text style={Styles.headingFontStyle}>No Jobs Available</Text>
      </View>}
      {data.map((item, index) => {
        return <Pressable onPress={() => {
          navigate("JobDetail", { id: item.id, isFromAppliedJobs: true })
        }}>
          <FlexDirRow style={{ marginHorizontal: 15, borderBottomWidth: 1, paddingBottom: 20, borderColor: "#b6b6b6" }}>

            <View style={{ borderWidth: 1, padding: 10, borderRadius: 5, borderColor: "#b6b6b6" }}>
              <Image source={{ uri: item.logo }} resizeMode='contain' style={SQUARE(40)} />
            </View>

            <Flex1 style={{ marginLeft: 10, gap: -5 }}>
              <Text style={[Styles.cardText, F_SIZE(15), { marginVertical: 5 }]}>{item.title}</Text>
              <Text style={[Styles.lightText, F_SIZE(13)]}>{item.description}</Text>
            </Flex1>

            <View>
              <Image source={Images.rightArrow} resizeMode='contain' style={SQUARE(30)} />
            </View>

          </FlexDirRow>
        </Pressable>
      })}
    </Flex1>
  )
}

export default ManageJobs

const styles = StyleSheet.create({})