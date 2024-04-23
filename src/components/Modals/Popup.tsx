import {
  Image,
  ImageProps,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import PrimaryBtn, { PrimaryBtnProps } from '../Button/PrimaryBtn';
import { CIRCLE, SQUARE, Styles, WIDTH, moderateScale, moderateScaleVertical } from '../../constants/Utils';
import FlexDirRow from '../Layouts/FlexDirRow';
import Fonts from '../../constants/Fonts';

export interface PopupBtnsType extends PrimaryBtnProps { }

export type PopUpProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  text?: string;
  headingText?: string;
  Btns?: PopupBtnsType[];
  BtnContainerStyle?: ViewStyle;
  Img?: ImageSourcePropType;
  ImgProps?: Omit<ImageProps, "source">;
  multipleImgs?: string[];
  outerBtnStyle?: ViewStyle;
  textStyle?: TextStyle;
};

const Popup: React.FC<PopUpProps> = ({
  setVisible,
  visible,
  text,
  headingText,
  Btns,
  BtnContainerStyle,
  Img,
  ImgProps,
  outerBtnStyle,
  textStyle,
  multipleImgs,
}) => {
  const scaleY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: scaleY.value }],
    };
  });
  useEffect(() => {
    scaleY.value = withTiming(visible ? 1 : 0);
  }, [visible]);

  const onClosePopUp = () => {
    return new Promise(resolve => {
      scaleY.value = withTiming(0, undefined, isFinished => {
        if (isFinished) {
          runOnJS(setVisible)(false);
          runOnJS(resolve)('');
        }
      });
    });
  };

  // background: linear-gradient(31deg, #2D569F 5.66%, #5A8AAA 43.42%, #EBD86B 86.67%);

  return (
    <Modal transparent visible={visible} onRequestClose={onClosePopUp}>
      <Pressable
        onPress={onClosePopUp}
        style={{ backgroundColor: '#000000c8', ...Styles.centerDivWithFlex }}>
        <Animated.View style={rStyle}>
          <View
            style={{
              flex: undefined,
              padding: 25,
              borderRadius: 10,
              width: WIDTH - 50,
            }}
          >
            <View style={{ ...Styles.centerDiv }}>
              {Img && (
                <Image
                  source={Img}
                  resizeMode="cover"
                  {...ImgProps}
                  style={[{ ...CIRCLE(WIDTH / 5) }, ImgProps?.style]}
                />
              )}
              {multipleImgs && (
                <FlexDirRow>
                  {multipleImgs.map((item, index) => (
                    <Image
                      key={index}
                      source={{ uri: item }}
                      style={{
                        ...CIRCLE(WIDTH / (5 + multipleImgs.length - 2)),
                        marginRight: -10,
                        aspectRatio: 1,
                        borderWidth: 2,
                        borderColor: 'white',
                      }}
                      resizeMode="cover"
                    />
                  ))}
                </FlexDirRow>
              )}

              {/* //?   HEADING TEXT */}
              {headingText && <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.bold,
                  fontSize: moderateScale(20),
                  marginVertical: moderateScaleVertical(8),
                }}>
                {headingText}
              </Text>}

              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.bold,
                  fontSize: moderateScale(16),
                  marginBottom: 25,
                  width: WIDTH / 1.5,
                  textAlign: 'center',
                  ...textStyle,
                }}>
                {text}
              </Text>
              <View
                style={[
                  { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
                  BtnContainerStyle,
                ]}>
                {Btns?.map((item, index) => {
                  return (
                    <View
                      style={{ maxWidth: WIDTH / 2.5, flex: 1, ...outerBtnStyle }}
                      key={index}>
                      <PrimaryBtn
                        {...item}
                        fSize={17}
                        pdVr={11}
                        onPress={() => {
                          onClosePopUp().then(() => {
                            if (item.onPress) {
                              item.onPress();
                            }
                          });
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({});
