import { PermissionsAndroid, Platform } from "react-native";

export const getPlatformIcon = iconName =>
  Platform.OS === "android" ? `md-${iconName}` : `ios-${iconName}`;

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Awesome Places Location Permission",
        message:
          "Awesome Places needs access to your location so you can share the awesome place you're at."
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("granted");
    } else {
      console.log("denied");
    }
  } catch (error) {
    console.warn(error);
  }
};
