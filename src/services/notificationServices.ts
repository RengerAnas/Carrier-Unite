import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import notifee, { AuthorizationStatus, EventType, Notification } from "@notifee/react-native";
import { request } from "react-native-permissions";
import { DEVICE_TYPE } from "../constants/Utils";
import { saveData } from "../Store/AsyncStorage/AsyncStorage";
import { FCM_TOKEN } from "../Store/AsyncStorage/AsyncStorage.Constant";

export default async () => {
  await messaging().requestPermission();

  messaging().registerDeviceForRemoteMessages();
  getFCMToken();
};
const getFCMToken = async () => {
  await messaging()
    .getToken()
    .then((token) => {
      saveData(FCM_TOKEN, token);
    });

  const DisplayNotification = async (notification?: FirebaseMessagingTypes.Notification) => {
    const channel = await notifee.createChannel({
      id: "default",
      name: "default",
    });

    // notifee.displayNotification({ notification } as any);
  };

  messaging().onMessage(async (remoteMessage) => {
    DisplayNotification(remoteMessage.notification);
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    DisplayNotification(remoteMessage.notification);
  });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    DisplayNotification(remoteMessage.notification);
  });
};
