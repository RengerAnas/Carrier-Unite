import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Styles } from '../../constants/Utils';
import Colors from '../../constants/Colors';

const Switch = ({
  title1,
  title2,
  SwitchVal,
  setSwitchVal,
  paddingVertical = 15,
  backgroundColor = 'white',
  SwitchbgColor = "white",
  ActiveSwitchbgColor = Colors.primary,
  spaceBeetween = 0,
}) => {

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={{ flex: 1, flexDirection: 'row', }}>
        <Pressable
          style={[
            Styles.centerDivWithFlex,
            {
              flex: 1,
              backgroundColor:
                SwitchVal === title1 ? ActiveSwitchbgColor : SwitchbgColor,
              borderRadius: 30,
              marginRight: spaceBeetween,
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: "#e3e3e3"
            },
            { paddingVertical },
          ]}
          onPress={() => setSwitchVal(title1)}>
          <Text style={[styles.text(SwitchVal, title1)]}>{title1}</Text>
        </Pressable>
      </View>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Pressable
          style={[
            Styles.centerDivWithFlex,
            {
              flex: 1,
              backgroundColor:
                SwitchVal === title2 ? ActiveSwitchbgColor : SwitchbgColor,
              borderRadius: 30,
              marginLeft: spaceBeetween,
              borderWidth: 1,
              borderColor: "#e3e3e3"

            },
            { paddingVertical },
          ]}
          onPress={() => setSwitchVal(title2)}>
          <Text style={[styles.text(SwitchVal, title2), {}]}>{title2}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 30,
    gap: 10, marginHorizontal: 10,
  },
  text: (SwitchVal, title) => ({
    color:
      SwitchVal === title
        ? 'white'
        : "black",
    fontSize: 15,
  }),
});