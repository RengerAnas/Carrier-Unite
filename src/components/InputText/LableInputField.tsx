import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  Pressable,
  ViewStyle,
} from 'react-native';
import React from 'react';
import InputFields, { InputFieldsProps } from './InputFields';
import { Styles, moderateScale } from '../../constants/Utils';

export interface PropsLabelInputFieldProps extends InputFieldsProps {
  label?: string;
  rLabel?: string;
  customInput?: React.ReactNode;
  pressableStyle?: ViewStyle;
}

const LabelInputField: React.FC<PropsLabelInputFieldProps> = props => {


  return (
    <Pressable
      style={[
        {
          marginTop: 10,
        },
        props.pressableStyle,
      ]}
      onPress={props.TextInputProps?.onPressIn}>
      <View style={[{ flexDirection: 'row', justifyContent: 'space-between' }]}>
        <Text
          style={{
            ...Styles.normalFontStyle,
            fontSize: 15,
            color: "black",
            paddingHorizontal: 15,
          }}>
          {props.label}
        </Text>
        {props.rLabel && (
          <Text
            style={{
              ...Styles.normalFontStyle,
              fontSize: moderateScale(14),
              color: 'orange',
              paddingHorizontal: 15,
            }}>
            {props.rLabel}
          </Text>
        )}
      </View>
      {props.customInput ? props.customInput : <InputFields {...props} />}
    </Pressable>
  );
};

export default LabelInputField;

const styles = StyleSheet.create({});
