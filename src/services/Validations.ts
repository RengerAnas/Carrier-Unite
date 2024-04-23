import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-simple-toast";

export const CheckNet = async () => {
  const state = await NetInfo.fetch();
  if (state.isConnected) return false;
  else {
    Toast.show("Check Your Internet Connection", Toast.SHORT);
    return true;
  }
};

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
