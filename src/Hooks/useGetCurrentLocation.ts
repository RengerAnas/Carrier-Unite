import React, { useEffect, useState } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import Geolocation, { GeoCoordinates } from "react-native-geolocation-service";
import { MapKey } from "../constants/API.Constants";
import { getDistance, getPreciseDistance } from "geolib";
import _ from "lodash";

export const fetchCurrentLocation = () => {
   return new Promise<Geolocation.GeoPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(
         (position) => {
            resolve(position);
         },
         (error) => {
            reject(error);
            // console.log('Error getting location:', error)
         },
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
      );
   });
};

export const useGetCurrentLocation = () => {
   const [location, setLocation] = useState<GeoCoordinates | boolean>();

   useEffect(() => {
      const requestLocationPermission = async () => {
         const isEnabled = await useEnableLocation();
         if (isEnabled) {
            fetchLocation();
         } else {
            // console.log('location denied')
            setLocation(false);
         }
      };
      const fetchLocation = () => {
         Geolocation.getCurrentPosition(
            (position) => {
               setLocation(position.coords);
            },
            (error) => {
               // console.log('Error getting location:', error)
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 }
         );
      };

      requestLocationPermission();
   }, []);

   return location;
};

export const useEnableLocation = async () => {
   if (Platform.OS === "android") {
      try {
         const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
         );
         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
         } else {
            // console.log('Location permission denied')
            return false;
         }
      } catch (error) {
         console.warn(error);
         return false;
      }
   } else {
      const grantIOS = await Geolocation.requestAuthorization("always");
      if (grantIOS == "granted") {
         return true;
      } else {
         return false;
      }
   }
};

export const useIsLocEnabled = () => {
   const [isLocEnabled, setIsLocEnabled] = useState(false);
   Geolocation.getCurrentPosition(
      () => {},
      (error) => {
         if (error.code == 1) {
            setIsLocEnabled(false);
         } else {
            setIsLocEnabled(true);
         }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
   );

   return isLocEnabled;
};

export const calculateDistance = async (
   originLat: string,
   originLon: string,
   destLat: string,
   destLon: string
) => {
   try {
      if (!(originLat && originLon && destLat && destLon)) return 0;
      const origin = `${originLat},${originLon}`;
      const destination = `${destLat},${destLon}`;
      const apiKeyParam = `key=${MapKey}`;

      const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&${apiKeyParam}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "OK" && data.rows.length > 0 && data.rows[0].elements.length > 0) {
         // Extracting the distance in meters from the response
         const distanceInMeters = data.rows[0].elements[0].distance?.value;

         if (distanceInMeters !== undefined) {
            // Convert distance to kilometers
            const distanceInKm = distanceInMeters / 1000;

            return distanceInKm;
         } else {
            console.error("Distance value not found in API response.");
            return null;
         }
      } else {
         console.error("Error in API response:", data.status);
         return null;
      }
   } catch (error) {
      console.error("Error fetching data from API:", error);
      return null;
   }
};
