import { StyleSheet } from 'react-native'
import React, { } from 'react'
import { useAppSelector } from '../../../Hooks/ReduxHooks'
import Flex1 from '../../../components/Layouts/Flex1'
import { NavigationProps } from '../../../Models/Navigation/NavigationModels'
import HomeRecruiter from '../../Recruiter/Components/HomeRecruiter'
import HomeJobSeeker from '../../JobSeeker/Components/HomeJobSeeker'

const Home = (props: NavigationProps<'Home'>) => {

   const isJobSeeker = useAppSelector(state => state.userData.userType) == 1

   return (
      <Flex1>
         {isJobSeeker ? <HomeJobSeeker /> : <HomeRecruiter />}
      </Flex1>
   )
}

export default Home

const styles = StyleSheet.create({})