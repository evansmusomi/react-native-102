import React, { Component } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { requestLocationPermission } from "../../utils/helpers";

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: -1.2859911,
      longitude: 36.8231155,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    },
    locationChosen: false
  };

  pickLocationHandler = event => {
    const coordinates = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude
    });
    this.setState(previousState => {
      return {
        focusedLocation: {
          ...previousState.focusedLocation,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        },
        locationChosen: true
      };
    });
  };

  getLocationHandler = () => {
    requestLocationPermission();

    navigator.geolocation.getCurrentPosition(
      position => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      error => {
        console.log(error);
        alert("Fetching the Postion failed, please pick one manually!");
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  render() {
    let marker = null;

    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.focusedLocation}
          onPress={this.pickLocationHandler}
          ref={ref => (this.map = ref)}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: 250
  },
  button: {
    margin: 8
  }
});

export default PickLocation;
