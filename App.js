import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

import ListItem from "./src/components/ListItem/ListItem";

export default class App extends Component {
  state = {
    placeName: "",
    places: []
  };

  placeNameChangedHandler = value => {
    this.setState({
      placeName: value
    });
  };

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    }

    this.setState(prevState => {
      return {
        places: [...prevState.places, prevState.placeName]
      };
    });
  };

  render() {
    const placesOutput = this.state.places.map((place, i) => (
      <ListItem key={i} placeName={place} />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.placeInput}
            placeholder="An Awesome Place"
            value={this.state.placeName}
            onChangeText={this.placeNameChangedHandler}
          />
          <Button
            title="Add"
            style={styles.placeButton}
            onPress={this.placeSubmitHandler}
          />
        </View>
        <View style={styles.listContainer}>{placesOutput}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
  listContainer: {
    width: "100%"
  }
});
