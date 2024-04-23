import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { memo } from 'react';
import { SQUARE, WIDTH } from '../../../constants/Utils';
import SubHeading from '../Text/SubHeading';
import Images from '../../../constants/Images';

type Props = {
  img: ImageSourcePropType;
  defaultSource?: ImageSourcePropType;
  size?: number;
  styles?: ViewStyle | ImageStyle | TextStyle;
  lable?: string;
  lStyle?: ViewStyle | ImageStyle | TextStyle;
  blurRadius?: number;
};

const AvatarImg: React.FC<Props> = ({
  img,
  defaultSource = Images.logowhite,
  size = WIDTH / 2,
  styles,
  lable,
  lStyle,
  blurRadius,
}) => {
  return (
    <>
      <Image
        source={img}
        blurRadius={blurRadius}
        defaultSource={defaultSource}
        style={{ ...SQUARE(size), borderRadius: size / 2, ...styles }}
        resizeMode="cover"
      />
      {lable && <SubHeading text={lable} styles={lStyle} />}
    </>
  );
};

export default memo(AvatarImg);

const styles = StyleSheet.create({});
