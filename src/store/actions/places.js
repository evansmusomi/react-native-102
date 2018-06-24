import { SET_PLACES, REMOVE_PLACE, SET_NEW_PLACE } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    const placeData = {
      name: placeName,
      location: location,
      image: ""
    };
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
        placeData.image = parsedResponse.imageUrl;
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
        placeData.key = parsedResponse.name;
        dispatch(setNewPlace(placeData));
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch("https://awesomeplaces-1528951686629.firebaseio.com/places.json")
      .catch(error => {
        alert("Something went wrong, sorry :/");
        console.log(error);
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
    dispatch(removePlace(key));
    fetch(
      `https://awesomeplaces-1528951686629.firebaseio.com/places/${key}.json`,
      {
        method: "DELETE"
      }
    )
      .catch(error => {
        alert("Something went wrong, sorry :/");
        console.log(error);
      })
      .then(response => response.json())
      .then(parsedResponse => {
        console.log("Done");
      });
  };
};

export const removePlace = key => {
  return {
    type: REMOVE_PLACE,
    key: key
  };
};
