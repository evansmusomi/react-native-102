import { Platform } from "react-native";

export const getPlatformIcon = iconName =>
  Platform.OS === "android" ? `md-${iconName}` : `ios-${iconName}`;
