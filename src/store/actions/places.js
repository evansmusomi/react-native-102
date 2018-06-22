import { ADD_PLACE, DELETE_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(
      "https://us-central1-awesomeplaces-1528951686629.cloudfunctions.net/storeImage",
      {
        method: "POST",
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(error => {
        console.log(error);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(response => response.json())
      .then(parsedResponse => {
        console.log(parsedResponse);
        const placeData = {
          name: placeName,
          location: location,
          image: parsedResponse.imageUrl
        };
        return fetch(
          "https://awesomeplaces-1528951686629.firebaseio.com/places.json",
          {
            method: "POST",
            body: JSON.stringify(placeData)
          }
        );
      })
      .catch(error => {
        console.log(error);
        alert("Something went wrong, please try again!");
        dispatch(uiStopLoading());
      })
      .then(response => response.json())
      .then(parsedResponse => {
        console.log(parsedResponse);
        dispatch(uiStopLoading());
        dispatch({
          type: ADD_PLACE,
          placeName: placeName,
          location: location,
          image: image
        });
      });
  };
};

export const deletePlace = key => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
};
