import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Flex1 from '../../../components/Layouts/Flex1'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import Images from '../../../constants/Images'
import { useIsFocused } from '@react-navigation/native'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import { Styles } from '../../../constants/Utils'
import { JobCard } from '../../Recruiter/Screens/PostedJobs'
import { navigate } from '../../../services/NavigationService'
import { useAppSelector } from '../../../Hooks/ReduxHooks'

type Props = {}

const HomeJobSeeker = (props: Props) => {
  const [data, setData] = useState<any[]>([])
  const myId = useAppSelector(state => state.userData.data?.id)

  const isFocused = useIsFocused()

  const getData = () => {
    apiWithToken(ENDPOINTS.getJobs + myId, "GET", undefined).then((res) => {
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
      <BackNavigationHeader hideBackBtn title='Home' rImg={Images.search} onrPress={() => {
        navigate("SearchJob")
      }} />
      {data.length == 0 && <View style={Styles.centerDivWithFlex}>
        <Text style={Styles.headingFontStyle}>No Jobs Available</Text>
      </View>}
      {data.map((item, index) => {
        return <>
          <JobCard item={item} index={index} len={data.length} setData={setData} getData={getData} />
        </>
      })}
    </Flex1>
  )
}

export default HomeJobSeeker

const styles = StyleSheet.create({})