import React, { Component } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";

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
          region={this.state.focusedLocation}
          onPress={this.pickLocationHandler}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert("Locate me")} />
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
