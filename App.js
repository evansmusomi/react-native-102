import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default class App extends Component {
  state = {
    placeName: ""
  };

  placeNameChangedHandler = value => {
    this.setState({
      placeName: value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ width: 300 }}
          placeholder="An Awesome Place"
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
        />
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
  }
});
