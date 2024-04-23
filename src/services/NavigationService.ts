import * as React from "react";
import {
  CommonActions,
  NavigationContainerRef,
  NavigationProp,
  StackActions,
} from "@react-navigation/native";
import { BottomTabStackParamsList, RootStackParamsList } from "../Models/Navigation/NavigationModels";

export const navigationRef = React.createRef<NavigationContainerRef<NavigationProp<any>>>();

export type screenNameType = keyof RootStackParamsList | keyof BottomTabStackParamsList;

type paramsType<T> = T extends keyof RootStackParamsList
  ? RootStackParamsList[T]
  : T extends keyof BottomTabStackParamsList
  ? BottomTabStackParamsList[T]
  : any;

export function navigate<T extends screenNameType>(name: T, params?: paramsType<T>) {
  navigationRef.current?.navigate(name as any, params as any);
}

export function push<T extends screenNameType>(name: T, params: paramsType<T>) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

export function replace<T extends screenNameType>(name: T, params: paramsType<T>) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const reset = (name: screenNameType) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: name }],
    })
  );
};
