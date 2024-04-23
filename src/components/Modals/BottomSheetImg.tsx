import {
  Image,
  ImageSourcePropType,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getImage } from '../../services/PermissionsServices';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';
import { SQUARE, Styles, WIDTH, moderateScaleVertical } from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Popup from './Popup';


type BottomSheetImgPropType = {
  bottomSheetVisible: boolean;
  rectangle?: boolean;
  setBottomSheetVisible: Dispatch<SetStateAction<boolean>>;
  setUserProfileImage: Dispatch<
    SetStateAction<any>
  >;
};

export const BottomSheetImg = ({
  bottomSheetVisible,
  setBottomSheetVisible,
  setUserProfileImage,
  rectangle
}: BottomSheetImgPropType) => {

  const [visible, setVisible] = useState(false)
  const [isCamera, setIsCamera] = useState(false)

  const choosefromGallary = async () => {
    getImage("gallery", rectangle).then((res) => {
      const uri = { uri: res.path };
      setBottomSheetVisible(false);
      setUserProfileImage(uri);
    })
      .catch((err) => {
        if (err == 'blocked') {
          setIsCamera(false)
          setVisible(true)
        }
      })

  };

  const choosefromCamera = async () => {
    getImage("camera", rectangle).then((res) => {
      const uri = { uri: res.path };
      setBottomSheetVisible(false);
      setUserProfileImage(uri);
    })
      .catch((err) => {
        if (err == 'blocked') {
          setIsCamera(true)
          setVisible(true)
        }
      })
  };

  const onAllowPress = () => {
    Linking.openSettings()
  }


  const headingText = 'Allow Permission'
  const text = `Allow Swiss Moooving to access this device ${isCamera ? "camera" : "gallery"} to upload a profile picture or upload a images of documents.`
  const Img = isCamera ? Images.camera : Images.gallery

  return (
    <Modal
      transparent
      visible={bottomSheetVisible}
      onRequestClose={() => {
        setBottomSheetVisible(false);
      }}
      hardwareAccelerated
      animationType="slide">
      <PermissionPopup {...{ visible, setVisible, headingText, text, Img, onAllowPress }} />
      <Pressable
        onPress={() => setBottomSheetVisible(false)}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: '#00000099',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            justifyContent: 'flex-end',
            paddingBottom: 30,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 15,
              color: 'black',
              paddingVertical: 15,
            }}>
            Upload Photo
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Pressable
                onPress={choosefromCamera}
                style={{
                  marginHorizontal: 10,
                  ...SQUARE(WIDTH / 6),
                  backgroundColor: Colors.primary,
                  padding: 10,
                  borderRadius: 100,
                  ...Styles.centerDiv,
                }}>
                <Image
                  source={Images.camera}
                  style={{ tintColor: 'white', ...SQUARE(WIDTH / 11) }}
                />
              </Pressable>
              <Text style={styles.text2}>Camera</Text>
            </View>

            <View>
              <Pressable
                onPress={choosefromGallary}
                style={{
                  marginHorizontal: 10,
                  ...SQUARE(WIDTH / 6),
                  backgroundColor: Colors.primary,
                  borderRadius: 100,
                  ...Styles.centerDiv,
                }}>
                <Image
                  source={Images.gallery}
                  style={{ tintColor: 'white', ...SQUARE(WIDTH / 11) }}
                />
              </Pressable>
              <Text style={styles.text2}>Gallery</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
const styles = StyleSheet.create({
  text2: {
    fontFamily: Fonts.medium,
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
});



type PermissionPopupPropType = {
  visible: boolean,
  setVisible: Dispatch<SetStateAction<boolean>>
  headingText?: string,
  text?: string,
  Img?: ImageSourcePropType,
  onAllowPress?: () => void
}

export const PermissionPopup = ({ visible, setVisible, Img, headingText, text, onAllowPress }: PermissionPopupPropType) => {

  return <Popup
    {...{ visible, setVisible, Img, headingText, text }}
    ImgProps={{
      resizeMode: "contain",
      style: { marginTop: moderateScaleVertical(10), tintColor: "white", borderRadius: 0 }
    }}
    BtnContainerStyle={{
      flexDirection: "column",
      width: "100%",
    }}
    outerBtnStyle={{ flex: undefined, width: '100%', maxWidth: undefined }}
    Btns={[
      { title: "Open Settings", onPress: onAllowPress },
      { title: "Deny", borderStyleBtn: "white" },
    ]} />
}