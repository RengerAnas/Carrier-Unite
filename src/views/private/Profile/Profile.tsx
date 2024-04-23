import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { store } from '../../../Store/Store'
import { logOut } from '../../../Store/Data/Auth/AuthSlice'
import Fonts from '../../../constants/Fonts'
import BackNavigationHeader from '../../../components/Button/BackNavigationHeader'
import Images from '../../../constants/Images'
import ProgressDialog from '../../../components/Modals/ProgressDIalog'
import SettingList from './Components/Settinglist'
import Colors from '../../../constants/Colors'
import { useAppSelector } from '../../../Hooks/ReduxHooks'
import { Styles } from '../../../constants/Utils'

let data = [
  {
    icon: Images.editProfile,
    screenName: 'EditProfile',
    title: ('Edit Profile'),
  },
  {
    icon: Images.pass,
    screenName: 'ChangePass',
    title: ('Change Password'),
  },
  {
    icon: Images.logout,
    screenName: '',
    title: ('Logout'),
    onpress: () => {
      Alert.alert(('Confirm'), ('Are you sure you want to logout?'), [
        { text: ('Cancel') },
        {
          text: ('Logout'),
          onPress: () => {
            store.dispatch(logOut())
          },
        },
      ]);
    },
  },
]

const Profile = () => {
  const user = useAppSelector(state => state.userData.data)
  const isRecruiter = useAppSelector(state => state.userData.userType) == 2

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <BackNavigationHeader hideBackBtn title='My Profile' />
      <View style={{
        backgroundColor: Colors.primary,
        padding: 10, borderRadius: 10, margin: 10, marginVertical: 20
      }}>
        <Text style={[Styles.normalFontStyle, { color: "white" }]}>{isRecruiter ? user?.companyName : user?.name}</Text>
        {!isRecruiter && <Text style={[Styles.normalFontStyle, { color: "white" }]}>{user?.jobTitle}</Text>}
      </View>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {data.map(item => (
          <SettingList {...item} key={item.title} />
        ))}
      </ScrollView>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})