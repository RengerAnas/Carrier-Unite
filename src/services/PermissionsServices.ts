import ImageCropPicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { check, AndroidPermission, IOSPermission, PermissionStatus, request } from "react-native-permissions";
import { DEVICE_TYPE, WIDTH } from "../constants/Utils";
import { PermissionsAndroid } from "react-native";

type permissionType = AndroidPermission | IOSPermission;

export const getPermissionStatus = (permission: permissionType) => {
   return new Promise((resolve: (val: PermissionStatus) => void, reject) => {
      check(permission)
         .then((result) => {
            resolve(result);
         })
         .catch((err) => {
            console.log({ err });
            reject(err);
         });
   });
};

export const getImage = (from: "gallery" | "camera", rectangle?: boolean) => {
   let permissionString: permissionType = permissionsStrings(from);

   const getImage = async () => {
      try {
         const picker = from == "gallery" ? ImageCropPicker.openPicker : ImageCropPicker.openCamera;
         const res = await picker({
            width: rectangle ? WIDTH * 0.8 : 400,
            height: rectangle ? WIDTH * 0.5 : 400,
            cropping: true,
         });
         return res;
      } catch (error: any) {
         return Promise.reject(error);
      }
   };

   return new Promise((resolve: (val: ImageOrVideo) => void, reject) => {
      request(permissionString).then((result) => {
         if (result == "granted" || result == "unavailable" || result == "limited") {
            getImage()
               .then((result) => {
                  resolve(result);
               })
               .catch((err) => {
                  reject(err);
               });
         } else {
            reject(result);
         }
      });
   });
};

export const permissionsStrings = (type: "location" | "camera" | "gallery"): permissionType => {
   const isAndroid = DEVICE_TYPE == "android";

   switch (type) {
      case "camera":
         return isAndroid ? "android.permission.CAMERA" : "ios.permission.CAMERA";
      case "gallery":
         return isAndroid ? "android.permission.READ_MEDIA_IMAGES" : "ios.permission.PHOTO_LIBRARY";
      case "location":
         return isAndroid ? "android.permission.ACCESS_FINE_LOCATION" : "ios.permission.LOCATION_WHEN_IN_USE";
   }
};

export const requestLocationPermission = async () => {
   return new Promise<PermissionStatus>(async (resolve, reject) => {
      if (true) {
         request(permissionsStrings("location")).then((res) => {
            if (res == "granted") {
               resolve(res);
            } else {
               reject(res);
            }
         });
      } else {
         // const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
         //   title: "Cool Photo App Camera Permission",
         //   message: "Cool Photo App needs access to your camera " + "so you can take awesome pictures.",
         //   buttonNeutral: "Ask Me Later",
         //   buttonNegative: "Cancel",
         //   buttonPositive: "OK",
         // });
         // if (res === PermissionsAndroid.RESULTS.GRANTED) {
         //   resolve(res as PermissionStatus);
         // } else {
         //   reject(res);
         // }
      }
   });
};
