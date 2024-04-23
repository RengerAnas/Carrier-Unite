import {
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Dimensions,
  FlexStyle,
  StatusBar,
} from "react-native";
import Colors from "./Colors";
import Fonts from "./Fonts";
// import * as yup from 'yup';

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height;
export const DEVICE_TYPE = Platform.OS;
export const DEFAULT_COUNTRY = "IN";
export const DEFAULT_CODE = "91";

export let emailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  validateEmail(email: string) {
    return emailReg.test(String(email).toLowerCase());
  },
};

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateScaleVertical = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;
const textScale = (percent: number) => {
  const screenHeight = Dimensions.get("window").height;
  //calculate absolute ratio for bigger screens 18.5:9 requiring smaller scaling
  const ratio = Dimensions.get("window").height / Dimensions.get("window").width;
  //Guideline sizes are based on standard ~5″ screen mobile device
  const deviceHeight = 375
    ? screenHeight * (ratio > 1.8 ? 0.126 : 0.15) //Set guideline depending on absolute ratio
    : Platform.OS === "android"
    ? screenHeight - (StatusBar.currentHeight as any)
    : screenHeight;

  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
};

export const MH = (val: number): any => ({
  marginHorizontal: F(val),
});

export const MV = (val: number): any => ({
  marginVertical: moderateScaleVertical(val),
});
export const MT = (val: number): any => ({
  marginTop: moderateScaleVertical(val),
});
export const MB = (val: number): any => ({
  marginBottom: moderateScaleVertical(val),
});

export const PH = (val: number): any => ({
  paddingHorizontal: F(val),
});

export const PV = (val: number): any => ({
  paddingVertical: moderateScaleVertical(val),
});

export function F(size: number) {
  return moderateScale(size);
}

export const F_SIZE = (val: number): any => ({
  fontSize: F(val),
});
export const F_Family = (val: string): any => ({
  fontFamily: val,
});

export const SQUARE = (val: number | string): any => ({
  width: val,
  height: val,
});

export const CIRCLE = (SIZE: number | string): any => ({
  width: SIZE,
  height: SIZE,
  borderRadius: SIZE,
});

export { scale, verticalScale, textScale, moderateScale, moderateScaleVertical, width, height };

export const Styles = StyleSheet.create({
  flex1: { flex: 1 },
  flexDirectionRow: {
    flexDirection: "row",
  },
  centerDiv: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerDivWithFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
  },
  SpaceBeetween: {
    justifyContent: "space-between",
  },
  SpaceB_AliCen: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  normalFontStyle: {
    fontFamily: Fonts.medium,
    fontSize: F(14),
    color: "black",
    //  color: Colors.Natural.Natural800,
  },
  subHeadingFontStyle: {
    fontSize: F(16),
    color: "black",
    fontWeight: "bold",
  },
  headingFontStyle: {
    fontSize: F(28),
    fontFamily: Fonts.bold,
    color: "black",
    textAlign: "center",
  },
  baseImage: {
    width: 40,
    height: 40,
  },
  subHeading: {
    fontFamily: Fonts.semiBold,
    color: "black",
    fontSize: F(23),
  },
  heading: {
    fontFamily: Fonts.semiBold,
    color: "black",
    fontSize: F(18),
  },
  cardText: {
    fontFamily: Fonts.semiBold,
    fontSize: F(17),
    color: "black",
  },
  detailText: {
    fontFamily: Fonts.medium,
    fontSize: F(12),
    color: "#6F6F6F",
    // textAlign: 'center',
  },
  priceText: {
    // fontFamily: Fonts.semiBold,
    fontFamily: Fonts.bold,
    fontSize: F(18),
    color: Colors.primary,
  },
  lightText: {
    fontFamily: Fonts.regular,
    fontSize: F(12),
    color: "#606060",
  },
  // container styles
  container: {
    flex: 1,
    backgroundColor: "white",
    // borderRadius: 30,
    padding: 20,
    // borderBottomEndRadius: 0,
    // borderBottomStartRadius: 0,
  },
  RowCommon: {
    gap: 10,
    marginHorizontal: 10,
  },
  FLEX_GROW: {
    flexGrow: 1,
  },
  bold: {
    fontFamily: Fonts.bold,
  },
  regular: {
    fontFamily: Fonts.regular,
  },
});

export const FLEX = Styles.flex1;
export const FLEX_GROW = Styles.FLEX_GROW;
export const CENTERED = Styles.centerDiv;
export const HEADING = Styles.headingFontStyle;
export const BOLD = Styles.bold;
export const REG = Styles.regular;
export const T_CENTER = Styles.centerText;
