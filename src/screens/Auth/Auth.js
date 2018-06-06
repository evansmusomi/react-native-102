import React, { Component } from "react";
import {
  Button,
  Dimensions,
  ImageBackground,
  View,
  StyleSheet
} from "react-native";

import startMainTabs from "../MainTabs/startMainTabs";
import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import ButtonWithBackground from "../../components/UI/ButtonWithBackground/ButtonWithBackground";
import backgroundImage from "../../assets/background.jpg";

class AuthScreen extends Component {
  state = {
    styles: {
      passwordContainerDirection: "column",
      passwordContainerJustifyContent: "flex-start",
      passwordWrapperWidth: "100%"
    }
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", dimensions => {
      if (Dimensions.get("window").height > 500) {
        this.setState({
          styles: {
            passwordContainerDirection: "column",
            passwordContainerJustifyContent: "flex-start",
            passwordWrapperWidth: "100%"
          }
        });
      } else {
        this.setState({
          styles: {
            passwordContainerDirection: "row",
            passwordContainerJustifyContent: "space-between",
            passwordWrapperWidth: "45%"
          }
        });
      }
    });
  }

  loginHandler = () => {
    startMainTabs();
  };

  render() {
    let headingText = null;
    if (Dimensions.get("window").height > 500) {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4">
            Switch to Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput placeholder="Email Address" />
            <View
              style={{
                flexDirection: this.state.styles.passwordContainerDirection,
                justifyContent: this.state.styles
                  .passwordContainerJustifyContent
              }}
            >
              <View style={{ width: this.state.styles.passwordWrapperWidth }}>
                <DefaultInput placeholder="Password" />
              </View>
              <View style={{ width: this.state.styles.passwordWrapperWidth }}>
                <DefaultInput placeholder="Confirm Password" />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  inputContainer: {
    width: "80%"
  }
});

export default AuthScreen;
