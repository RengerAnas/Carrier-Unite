import { StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { userDataSelector } from '../../../Store/Data/Auth/AuthSlice'
import RecruiterRegister from './RecruiterRegister'
import JobSeekerRegister from './JobSeekerRegister'
import Flex1 from '../../../components/Layouts/Flex1'

const Register = () => {
   const isRecruiter = useSelector(userDataSelector).userType == 2
   
   return <Flex1 style={{backgroundColor:"white"}}>
   {isRecruiter ? <RecruiterRegister /> :  <JobSeekerRegister />}   
   </Flex1>
}

export default Register

const styles = StyleSheet.create({})   