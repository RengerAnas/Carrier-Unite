import { apiWithToken } from "../ApiService/core/ApiRequest";
import { setNotificationCount, setUserData } from "../Store/Data/Auth/AuthSlice";
import { store } from "../Store/Store";
import { ENDPOINTS } from "../constants/API.Constants";

export const isDriver = () => store.getState().userData.userType == 2;

export const updateNotification = () => {
  apiWithToken(
    store.getState().userData.userType == 1
      ? ENDPOINTS.userUnReadNotification
      : ENDPOINTS.driverUnReadNotification,
    "GET",
    undefined,
    true,
    true,
    "",
    { data: [], name: "" },
    {},
    false
  ).then((res) => {
    store.dispatch(setNotificationCount(res.data));
  });
};

export const updateUserData = () => {
  apiWithToken(ENDPOINTS.getUser, "POST", {}, true, true, "", undefined, undefined, false).then((res) => {
    store.dispatch(setUserData(res.data));
  });
};
