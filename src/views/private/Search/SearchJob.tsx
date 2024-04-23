import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Flex1 from '../../../components/Layouts/Flex1'
import { apiWithToken } from '../../../ApiService/core/ApiRequest'
import { ENDPOINTS } from '../../../constants/API.Constants'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import { goBack } from '../../../services/NavigationService'
import Images from '../../../constants/Images'
import { SQUARE, Styles } from '../../../constants/Utils'
import { JobCard } from '../../Recruiter/Screens/PostedJobs'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import InputFields from '../../../components/InputText/InputFields'
import { store } from '../../../Store/Store'

type Props = {}

const SearchJob = (props: Props) => {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const top = useSafeAreaInsets().top
  const myId = store.getState().userData.data?.id

  const getData = () => {
    apiWithToken(ENDPOINTS.searchJob + `${myId}/` + search, "GET", undefined, true, undefined, undefined, undefined, undefined, false).then((res) => {
      setData(res.data)
    }).catch((err) => {
      setData([])
    })
  }

  useEffect(() => {
    getData()
  }, [search])

  return (
    <Flex1 style={{ backgroundColor: "white" }}>

      <FlexDirRow style={{ marginTop: top }}>
        <Pressable onPress={() => goBack()} style={{ marginLeft: 10 }}>
          <Image source={Images.backArr} resizeMode={'contain'} style={SQUARE(30)} />
        </Pressable>
        <InputFields placeholder='Search Job' lImg={Images.search} style={{ flex: 1 }} value={search} onChangeText={setSearch} rImg={Images.close} onRImgPress={() => setSearch("")} />
      </FlexDirRow>

      {data.length == 0 && <View style={Styles.centerDivWithFlex}>
        <Text style={Styles.headingFontStyle}>No Jobs Available</Text>
      </View>}
      {data.map((item, index) => {
        return <>
          <JobCard item={item} index={index} len={data.length} setData={setData} getData={getData} />
        </>
      })}
    </Flex1>)
}

export default SearchJob

const styles = StyleSheet.create({})