import {
  ImageSourcePropType,
  ImageStyle,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import GradientProvider from './GradientProvider';
import HideStatusbar from './HideStatusbar';
import SafeArea from './SafeArea';
import {HEIGHT, Styles} from '../../../constants/Utils';
import BackNavigationHeader from '../Buttons/BackNavigationHeader';
import {getTheme} from '../../../Store/ContextStore';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | TextStyle | ImageStyle;
  ContainerStyle?: ViewStyle | TextStyle | ImageStyle;
  navigationtitle?: string;
  GradientProviderSecondStyle?: Boolean;
  navigationImg?: ImageSourcePropType;
  navRText?: string;
  rTextStyle?: TextStyle;
  CustomeHeaderComponent?: React.FC;
  scrollViewProps?: ScrollViewProps;
};

const CommonGraWrapper: React.FC<Props> = ({
  GradientProviderSecondStyle = true,
  navigationtitle,
  style,
  ContainerStyle,
  rTextStyle,
  navRText,
  navigationImg,
  children,
  CustomeHeaderComponent,
  scrollViewProps,
}) => {
  const theme = getTheme();

  return (
    <GradientProvider secondStyle={GradientProviderSecondStyle}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}>
        <HideStatusbar />
        <SafeArea />
        {CustomeHeaderComponent ? (
          <CustomeHeaderComponent />
        ) : (
          <BackNavigationHeader
            title={navigationtitle}
            rimg={navigationImg}
            rtext={navRText}
            rTextStyle={rTextStyle}
          />
        )}
        <View
          style={{
            ...Styles.container,
            ...ContainerStyle,
            backgroundColor: theme.backgroundColor,
          }}>
          {children}
        </View>
      </ScrollView>
    </GradientProvider>
  );
};

export default CommonGraWrapper;

const styles = StyleSheet.create({});
