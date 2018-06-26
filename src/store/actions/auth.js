import Config from "react-native-config";
import { TRY_AUTH } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${
      Config.FIREBASE_API_KEY
    }`;

    if (authMode === "signup") {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
        Config.FIREBASE_API_KEY
      }`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(error => {
        dispatch(uiStopLoading());
        console.log(error);
        alert("Authentication failed, please try again!");
      })
      .then(response => response.json())
      .then(parsedResponse => {
        dispatch(uiStopLoading());
        if (parsedResponse.error) {
          alert("Authentication failed, please try again!");
        } else {
          startMainTabs();
        }
        console.log(parsedResponse);
      });
  };
};
