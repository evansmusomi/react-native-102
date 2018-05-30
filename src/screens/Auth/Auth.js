import React, { Component } from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";

import startMainTabs from "../MainTabs/startMainTabs";

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Please Log In</Text>
        <Button title="Switch to Login" />
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            underlineColorAndroid="transparent"
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            underlineColorAndroid="transparent"
          />
        </View>
        <Button title="Submit" onPress={this.loginHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    width: "80%"
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    margin: 8
  }
});

export default AuthScreen;
