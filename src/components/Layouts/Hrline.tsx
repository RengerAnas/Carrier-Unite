import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'

type Props = {}

const Hrline = (props: Props) => {
   return (
      <View style={{
         marginVertical: 15,
         borderBottomWidth: 1,
         borderBottomColor: Colors.borderColor,
      }} />
   )
}

export default Hrline

const styles = StyleSheet.create({})