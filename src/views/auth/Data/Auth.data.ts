import { getData } from "../../../Store/AsyncStorage/AsyncStorage";
import { FCM_TOKEN } from "../../../Store/AsyncStorage/AsyncStorage.Constant";
import { store } from "../../../Store/Store";
import { DEFAULT_CODE, DEVICE_TYPE } from "../../../constants/Utils";
import { capitalizeFirstLetter } from "../../../services/Validations";

export const registerInitialValues = () => {
  const {  userType: User_Type } = store.getState().userData;
  return {
    User_Type,
    full_name: "",
    country_code: DEFAULT_CODE,
    phone_number: "",
    email: "",
    password: "",
  };
};
