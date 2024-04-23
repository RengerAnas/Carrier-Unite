import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Colors from '../../../../constants/Colors';
import { SQUARE, Styles } from '../../../../constants/Utils';
import Flex1 from '../../../../components/Layouts/Flex1';

export interface SettingsListProps {
  title: string;
  icon: ImageSourcePropType;
  screenName?: string;
  onpress?: () => void;
}


const SettingList: React.FC<SettingsListProps> = ({
  icon,
  title,
  screenName,
  onpress,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Pressable
      style={[styles.container, {}]}
      onPress={() => {
        onpress ? onpress() : navigation.navigate(screenName as any);
      }}>
      <View style={{
        backgroundColor: "#F1F5FD",
        borderRadius: 100, alignSelf: "center", padding: 10
      }}>
        <Image
          source={icon}
          style={{ ...SQUARE(25), tintColor: Colors.primary }}
        />
      </View>
      <Flex1 style={{
        borderBottomWidth: 1,
        borderColor: "#e1e1e1",
        flex: 1,
        marginLeft: 25,
        paddingBottom: 15,
      }}>
        <Text
          style={[
            styles.text,
            {
              color: "black",
            },
          ]}>
          {title}
        </Text>
      </Flex1>
    </Pressable>
  );
};

export default SettingList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginVertical: 7.5,
    marginLeft: 20,
  },
  text: {
    ...Styles.normalFontStyle,
    color: 'black',
  },
});
