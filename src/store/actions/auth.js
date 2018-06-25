import { TRY_AUTH } from "./actionTypes";

export const tryAuth = authData => {
  return dispatch => {
    dispatch(authSignUp(authData));
  };
};

export const authSignUp = authData => {
  return dispatch => {
    fetch(
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyASvVR4L25fpyeyAy1c48Op1aQfZ1Zab5s",
      {
        method: "POST",
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .catch(error => {
        console.log(error);
        alert("Authentication failed, please try again!");
      })
      .then(response => response.json())
      .then(parsedResponse => {
        console.log(parsedResponse);
      });
  };
};
