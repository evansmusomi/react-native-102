import { SET_PLACES, REMOVE_PLACE, SET_NEW_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    const placeData = {
      name: placeName,
      location: location,
      image: ""
    };
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!");
      })
      .then(token => {
        authToken = token;
        return fetch(
          "https://us-central1-awesomeplaces-1528951686629.cloudfunctions.net/storeImage",
          {
            method: "POST",
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        )
          .then(response => response.json())
          .then(parsedResponse => {
            console.log(parsedResponse);
            placeData.image = parsedResponse.imageUrl;
            return fetch(
              `https://awesomeplaces-1528951686629.firebaseio.com/places.json?auth=${authToken}`,
              {
                method: "POST",
                body: JSON.stringify(placeData)
              }
            );
          })
          .then(response => response.json())
          .then(parsedResponse => {
            placeData.key = parsedResponse.name;
            dispatch(setNewPlace(placeData));
            dispatch(uiStopLoading());
          })
          .catch(error => {
            console.log(error);
            alert("Something went wrong, please try again!");
            dispatch(uiStopLoading());
          });
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => alert("No valid token found!"))
      .then(token => {
        return fetch(
          `https://awesomeplaces-1528951686629.firebaseio.com/places.json?auth=${token}`
        );
      })
      .then(response => response.json())
      .then(parsedResponse => {
        const places = [];
        for (let key in parsedResponse) {
          places.push({
            ...parsedResponse[key],
            image: {
              uri: parsedResponse[key].image
            },
            key: key
          });
        }
        dispatch(setPlaces(places));
      })
      .catch(error => {
        alert("Something went wrong, sorry :/");
        console.log(error);
      });
  };
};

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  };
};

export const setNewPlace = place => {
  return {
    type: SET_NEW_PLACE,
    place: {
      image: {
        uri: place.image
      },
      location: place.location,
      name: place.name,
      key: place.key
    }
  };
};

export const deletePlace = key => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => alert("No valid token found!"))
      .then(token => {
        dispatch(removePlace(key));
        return fetch(
          `https://awesomeplaces-1528951686629.firebaseio.com/places/${key}.json?auth=${token}`,
          {
            method: "DELETE"
          }
        );
      })
      .then(response => response.json())
      .then(parsedResponse => {
        console.log("Done");
      })
      .catch(error => {
        alert("Something went wrong, sorry :/");
        console.log(error);
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
