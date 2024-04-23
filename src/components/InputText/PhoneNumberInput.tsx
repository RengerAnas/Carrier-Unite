import { StyleSheet, View, Image } from 'react-native';
import React, { ChangeEvent } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';
import { FormikErrors, FormikTouched, useFormik } from 'formik';
import YupError from '../Text/YupError';
import { DEFAULT_CODE, DEFAULT_COUNTRY, DEVICE_TYPE, SQUARE, Styles } from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';

export interface PhoneNumberInputProps extends PhoneInputProps {
  formik: ReturnType<typeof useFormik<any>>;
  name: string;
  codeName: string;
}
const PhoneNumberInput = (props: PhoneNumberInputProps) => {
  let isTouched: FormikTouched<any> | undefined;
  let Err: FormikErrors<any> | undefined;
  let onBlur: (e: any) => void = e => { };
  let value = '';
  let onChangeText = (e: string | ChangeEvent<any>) => { };

  if (props.formik) {
    const { values, handleBlur, handleChange, touched, errors } = props.formik;
    const formikName = props.name;
    value = values[formikName];
    onChangeText = handleChange(formikName);
    onBlur = handleBlur(formikName);
    isTouched = touched;
    Err = errors;
  }


  return (
    <View
      style={{
        marginHorizontal: 15,
        marginVertical: 10,
      }}>
      <View
        style={{
          borderWidth: 1,
          padding: DEVICE_TYPE == 'ios' ? 8 : 0,
          paddingHorizontal: 10,
          borderRadius: 6,
          borderColor: Colors.gray,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={Images.mobile}
          resizeMode={'contain'}
          style={{ ...SQUARE(30), }}
        />
        <PhoneInput
          defaultCode={DEFAULT_COUNTRY}
          layout="second"
          onChangeCountry={country => {
            props.formik.setFieldValue(props.codeName, country.callingCode[0]);
          }}
          {...props}
          textInputProps={{
            ...props.textInputProps,
            onBlur: onBlur,
            // value,
            value,
            onChangeText,
            // selectionColor: theme.color,
            placeholderTextColor: 'darkgray',
          }}
          containerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            height: DEVICE_TYPE == 'android' ? 45 : 35,
          }}
          textContainerStyle={{
            backgroundColor: "white",
            height: '100%',
            flex: 7,
          }}
          textInputStyle={{
            height: 40,
            fontFamily: Fonts.medium,
            flex: 1,
            fontSize: 15,
            // color: theme.color,
          }}
          flagButtonStyle={{
            flex: 1,
            // backgroundColor: theme.backgroundColor,
          }}
          codeTextStyle={{
            // color: theme.color,
          }}
          renderDropdownImage={
            <Image
              source={Images.rightArrow}
              style={{
                width: 20,
                height: 20,
                // tintColor: theme.color,
                transform: [{ rotateZ: '90deg' }],
              }}
              resizeMode="contain"
            />
          }
        />
      </View>
      {isTouched?.[props.name] && Err?.[props.name] && (
        <YupError err={Err?.[props.name]?.toString()} />
      )}
    </View>
  );
};

export default PhoneNumberInput;

const styles = StyleSheet.create({});

export function getCountryCodeFromNumber(number: any) {

  const countryCodes = [
    { 93: "AF" },
    { 355: "AL" },
    { 213: "DZ" },
    { 1: "AS" },
    { 376: "AD" },
    { 244: "AO" },
    { 1: "AI" },
    { 672: "AQ" },
    { 1: "AG" },
    { 54: "AR" },
    { 374: "AM" },
    { 297: "AW" },
    { 61: "AU" },
    { 43: "AT" },
    { 994: "AZ" },
    { 1: "BS" },
    { 973: "BH" },
    { 880: "BD" },
    { 1: "BB" },
    { 375: "BY" },
    { 32: "BE" },
    { 501: "BZ" },
    { 229: "BJ" },
    { 1: "BM" },
    { 975: "BT" },
    { 591: "BO" },
    { 387: "BA" },
    { 267: "BW" },
    { 47: "BV" },
    { 55: "BR" },
    { 246: "IO" },
    { 1: "VG" },
    { 673: "BN" },
    { 359: "BG" },
    { 226: "BF" },
    { 257: "BI" },
    { 855: "KH" },
    { 237: "CM" },
    { 1: "CA" },
    { 238: "CV" },
    { 599: "BQ" },
    { 345: "KY" },
    { 236: "CF" },
    { 235: "TD" },
    { 56: "CL" },
    { 86: "CN" },
    { 61: "CX" },
    { 61: "CC" },
    { 57: "CO" },
    { 269: "KM" },
    { 682: "CK" },
    { 506: "CR" },
    { 385: "HR" },
    { 53: "CU" },
    { 599: "CW" },
    { 357: "CY" },
    { 420: "CZ" },
    { 243: "CD" },
    { 45: "DK" },
    { 253: "DJ" },
    { 1: "DM" },
    { 1: "DO" },
    { 593: "EC" },
    { 20: "EG" },
    { 503: "SV" },
    { 240: "GQ" },
    { 291: "ER" },
    { 372: "EE" },
    { 268: "SZ" },
    { 251: "ET" },
    { 500: "FK" },
    { 298: "FO" },
    { 679: "FJ" },
    { 358: "FI" },
    { 33: "FR" },
    { 594: "GF" },
    { 689: "PF" },
    { 262: "TF" },
    { 241: "GA" },
    { 220: "GM" },
    { 995: "GE" },
    { 49: "DE" },
    { 233: "GH" },
    { 350: "GI" },
    { 30: "GR" },
    { 299: "GL" },
    { 1: "GD" },
    { 590: "GP" },
    { 1: "GU" },
    { 502: "GT" },
    { 44: "GG" },
    { 224: "GN" },
    { 245: "GW" },
    { 592: "GY" },
    { 509: "HT" },
    { 672: "HM" },
    { 504: "HN" },
    { 36: "HU" },
    { 354: "IS" },
    { 91: "IN" },
    { 62: "ID" },
    { 98: "IR" },
    { 964: "IQ" },
    { 353: "IE" },
    { 44: "IM" },
    { 972: "IL" },
    { 39: "IT" },
    { 225: "CI" },
    { 1: "JM" },
    { 81: "JP" },
    { 44: "JE" },
    { 962: "JO" },
    { 7: "KZ" },
    { 254: "KE" },
    { 383: "XK" },
    { 965: "KW" },
    { 996: "KG" },
    { 856: "LA" },
    { 371: "LV" },
    { 961: "LB" },
    { 266: "LS" },
    { 231: "LR" },
    { 218: "LY" },
    { 423: "LI" },
    { 370: "LT" },
    { 352: "LU" },
    { 853: "MO" },
    { 389: "MK" },
    { 261: "MG" },
    { 265: "MW" },
    { 60: "MY" },
    { 960: "MV" },
    { 223: "ML" },
    { 356: "MT" },
    { 692: "MH" },
    { 596: "MQ" },
    { 222: "MR" },
    { 230: "MU" },
    { 262: "YT" },
    { 52: "MX" },
    { 691: "FM" },
    { 373: "MD" },
    { 377: "MC" },
    { 976: "MN" },
    { 382: "ME" },
    { 1: "MS" },
    { 212: "MA" },
    { 258: "MZ" },
    { 95: "MM" },
    { 264: "NA" },
    { 674: "NR" },
    { 977: "NP" },
    { 31: "NL" },
    { 687: "NC" },
    { 64: "NZ" },
    { 505: "NI" },
    { 227: "NE" },
    { 234: "NG" },
    { 683: "NU" },
    { 672: "NF" },
    { 850: "KP" },
    { 1: "MP" },
    { 47: "NO" },
    { 968: "OM" },
    { 92: "PK" },
    { 680: "PW" },
    { 970: "PS" },
    { 507: "PA" },
    { 675: "PG" },
    { 595: "PY" },
    { 51: "PE" },
    { 63: "PH" },
    { 64: "PN" },
    { 48: "PL" },
    { 351: "PT" },
    { 1: "PR" },
    { 974: "QA" },
    { 242: "CG" },
    { 40: "RO" },
    { 7: "RU" },
    { 250: "RW" },
    { 262: "RE" },
    { 590: "BL" },
    { 290: "SH" },
    { 1: "KN" },
    { 1: "LC" },
    { 590: "MF" },
    { 508: "PM" },
    { 1: "VC" },
    { 685: "WS" },
    { 378: "SM" },
    { 966: "SA" },
    { 221: "SN" },
    { 381: "RS" },
    { 248: "SC" },
    { 232: "SL" },
    { 65: "SG" },
    { 1: "SX" },
    { 421: "SK" },
    { 386: "SI" },
    { 677: "SB" },
    { 252: "SO" },
    { 27: "ZA" },
    { 500: "GS" },
    { 82: "KR" },
    { 211: "SS" },
    { 34: "ES" },
    { 94: "LK" },
    { 249: "SD" },
    { 597: "SR" },
    { 47: "SJ" },
    { 46: "SE" },
    { 41: "CH" },
    { 963: "SY" },
    { 239: "ST" },
    { 886: "TW" },
    { 992: "TJ" },
    { 255: "TZ" },
    { 66: "TH" },
    { 670: "TL" },
    { 228: "TG" },
    { 690: "TK" },
    { 676: "TO" },
    { 1: "TT" },
    { 216: "TN" },
    { 90: "TR" },
    { 993: "TM" },
    { 1: "TC" },
    { 688: "TV" },
    { 256: "UG" },
    { 380: "UA" },
    { 971: "AE" },
    { 44: "GB" },
    { 1: "US" },
    { 1: "UM" },
    { 1: "VI" },
    { 598: "UY" },
    { 998: "UZ" },
    { 678: "VU" },
    { 379: "VA" },
    { 58: "VE" },
    { 84: "VN" },
    { 681: "WF" },
    { 212: "EH" },
    { 967: "YE" },
    { 260: "ZM" },
    { 263: "ZW" },
    { 686: "KI" },
    { 852: "HK" },
    { 358: "AX" },
  ];

  return countryCodes.filter(i => {
    if (Object.keys(i)[0] == number) {
      return true
    }
  })[0][number as keyof typeof countryCodes[0]] as any
}

