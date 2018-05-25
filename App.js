import { Navigation } from "react-native-navigation";

import AuthScreen from "./src/screens/Auth/Auth";

// Register screens
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);

// Start a navigation app
Navigation.startSingleScreenApp({
  screen: {
    screen: "awesome-places.AuthScreen",
    title: "Login"
  }
});
