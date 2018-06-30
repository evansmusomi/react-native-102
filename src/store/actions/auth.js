import { AsyncStorage } from "react-native";
import Config from "react-native-config";
import { AUTH_SET_TOKEN } from "./actionTypes";
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
      .then(response => response.json())
      .then(parsedResponse => {
        dispatch(uiStopLoading());
        if (!parsedResponse.idToken) {
          alert("Authentication failed, please try again!");
        } else {
          dispatch(
            authStoreToken(parsedResponse.idToken, parsedResponse.expiresIn)
          );
          startMainTabs();
        }
        console.log(parsedResponse);
      })
      .catch(error => {
        dispatch(uiStopLoading());
        console.log(error);
        alert("Authentication failed, please try again!");
      });
  };
};

export const authStoreToken = (token, expiresIn) => {
  return dispatch => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
  };
};

export const authSetToken = token => {
  return {
    type: AUTH_SET_TOKEN,
    token: token
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(error => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("ap:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(() => reject());
      } else {
        resolve(token);
      }
    });
    promise.catch(() => {
      dispatch(authClearStorage());
    });
    return promise;
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(() => {
        startMainTabs();
      })
      .catch(() => console.log("Failed to fetch token"));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
  };
};
