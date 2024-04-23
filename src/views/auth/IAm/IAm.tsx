import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Styles, WIDTH, moderateScale, moderateScaleVertical } from '../../../constants/Utils'
import Colors from '../../../constants/Colors'
import AuthButton from '../../../components/Button/AuthButton'
import { NavigationProps } from '../../../Models/Navigation/NavigationModels'
import Images from '../../../constants/Images'
import { useAppDispatch } from '../../../Hooks/ReduxHooks'
import { setUserType } from '../../../Store/Data/Auth/AuthSlice'

type Props = {}

const IAm = ({ navigation }: NavigationProps<'IAm'>) => {

   const dispatch = useAppDispatch()

   const onTypeSelect = (type: number) => {
      navigation.navigate("Login")
      dispatch(setUserType(type))
   }

   return (
      <View style={[Styles.centerDivWithFlex, { backgroundColor: Colors.primary100 }]}>
         <View style={{ gap: moderateScale(25) }}>
            <Text style={Styles.headingFontStyle}>{"I am a"}</Text>
            <View style={{ width: WIDTH * 0.85, gap: moderateScaleVertical(12) }}>
               <AuthButton title={"JobSeeker"} onPress={() => onTypeSelect(1)} image={Images.bag} />
               <AuthButton title={"Recruiter"} onPress={() => onTypeSelect(2)} image={Images.user2} />
            </View>
         </View>
      </View>
   )
}

export default IAm

const styles = StyleSheet.create({})