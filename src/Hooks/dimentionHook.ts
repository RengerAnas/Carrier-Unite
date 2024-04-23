import { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useGetStatusBarHeight = () => {
   const insets = useSafeAreaInsets();

   return insets.top;
};

export const useBottomBarHeight = () => {
   const insets = useSafeAreaInsets();
   return insets.bottom;
};
