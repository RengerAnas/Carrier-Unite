import { Modal, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import React, { ReactNode, memo, useMemo, useRef } from 'react';
import { useState } from 'react';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { DEVICE_TYPE, HEIGHT, WIDTH } from '../../constants/Utils';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  RotationGestureHandler,
} from 'react-native-gesture-handler';
import Flex1 from '../Layouts/Flex1';

type Props = {
  children?: ReactNode;
  visible?: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type ContextType = {
  translateY: number;
};

const BottomSheet = ({ children, setVisible, visible }: Props) => {
  const translateY = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);

  const contentHeightRef = useRef(contentHeight);

  useMemo(() => {
    initialAnimation();
  }, [visible]);

  useMemo(() => {
    if (contentHeightRef.current == 0 && contentHeight > 0) {
      initialAnimation();
      contentHeightRef.current = contentHeight;
    }
  }, [contentHeight]);

  function initialAnimation() {
    if (visible) {
      translateY.value = contentHeight;
      translateY.value = withTiming(0);
    }
  }

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart(event, context) {
      context.translateY = translateY.value;
    },
    onActive(event, ctx) {
      const sum = ctx.translateY + event.translationY;

      if (sum >= 0) {
        translateY.value = sum;
      }
    },
    onEnd(event, context) {
      if (translateY.value > contentHeight * 0.4 || event.velocityY > 1200) {
        translateY.value = withTiming(contentHeight * 1.1, undefined, () => {
          runOnJS(setVisible)(false);
        });
      } else {
        translateY.value = withTiming(0);
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backWrapperStyle = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, contentHeight], [0.6, 0]);

    return { opacity };
  });


  return (
    <Modal {...{ visible }} transparent onRequestClose={() => setVisible(false)} animationType='slide'>
      <Animated.View style={[styles.backWrapper, backWrapperStyle]} />
      <StatusBar translucent={true} backgroundColor={'rgba(0,0,0,0.6)'} />
      <Flex1
        style={{
          justifyContent: 'flex-end',
        }}>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[styles.knobContainer, containerStyle]}>
              <View style={[styles.knob]} />
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
        <Animated.View
          style={[styles.container, containerStyle]}
          onLayout={e => setContentHeight(e.nativeEvent.layout.height)}>
          {children}
        </Animated.View>
      </Flex1>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backWrapper: {
    backgroundColor: '#000',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -99,
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 0,
    maxHeight: HEIGHT * 0.9,
  },
  knobContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
  },
  knob: {
    backgroundColor: '#D9D9D9',
    width: WIDTH * 0.1,
    // height: 10,
    height: 6,
    borderRadius: 100,
    alignSelf: 'center',
  },
});
