import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Styles } from '../../../constants/Utils'
import Flex1 from '../../../components/Layouts/Flex1'
import FlexDirRow from '../../../components/Layouts/FlexDirRow'
import Colors from '../../../constants/Colors'

type Props = {
  data: string[]
  selected: string
  setSelected: (val: string) => void
}

const MultipleSwitch = ({ data, selected, setSelected }: Props) => {

  return (
    <View style={{ margin: 15, gap: 10 }}>
      <Text style={[Styles.normalFontStyle,]}>job Type</Text>
      <FlexDirRow gap={15}>
        {data.map((item, index) => {
          return <Pressable onPress={() => {
            setSelected(item)
          }}>
            <Flex1 style={{
              backgroundColor: selected == item ?
                Colors.primary : "white",
              borderWidth: 1, borderColor: Colors.gray,
              borderRadius: 100, padding: 10, alignItems: "center"
            }}>
              <Text style={[Styles.lightText,
              { color: selected == item ? "white" : "#3e3e3e" }
              ]}>{item}</Text>
            </Flex1>
          </Pressable>
        })}
      </FlexDirRow>
    </View>
  )
}

export default MultipleSwitch

const styles = StyleSheet.create({})