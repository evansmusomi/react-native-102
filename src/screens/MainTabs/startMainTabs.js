import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import { getPlatformIcon } from "../../utils/helpers";

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(getPlatformIcon("map"), 30),
    Icon.getImageSource(getPlatformIcon("share-alt"), 30),
    Icon.getImageSource(getPlatformIcon("menu"), 30)
  ]).then(imageSources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: "awesome-places.FindPlaceScreen",
          label: "Find Place",
          title: "Find Place",
          icon: imageSources[0],
          navigatorButtons: {
            leftButtons: [
              {
                icon: imageSources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        },
        {
          screen: "awesome-places.SharePlaceScreen",
          label: "Share Place",
          title: "Share Place",
          icon: imageSources[1],
          navigatorButtons: {
            leftButtons: [
              {
                icon: imageSources[2],
                title: "Menu",
                id: "sideDrawerToggle"
              }
            ]
          }
        }
      ],
      drawer: {
        left: {
          screen: "awesome-places.SideDrawerScreen"
        }
      }
    });
  });
};

export default startTabs;
