import React from "react";
import { StyleSheet, TextInput } from "react-native";

const DefaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: "#fff"
  }
});

export default DefaultInput;
