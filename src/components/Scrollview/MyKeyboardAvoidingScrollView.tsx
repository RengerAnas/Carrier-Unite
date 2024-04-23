import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'

interface Props extends KeyboardAwareScrollViewProps {
}

const MyKeyboardAvoidingScrollView = ({ children, ...props }: Props) => {
   return (
      <KeyboardAwareScrollView {...props} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{
         flexGrow: 1
      }}>
         {children}
      </KeyboardAwareScrollView>
   )
}

export default MyKeyboardAvoidingScrollView

const styles = StyleSheet.create({})