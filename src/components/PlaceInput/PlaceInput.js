import React, { Component } from "react";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const PlaceInput = props => (
  <DefaultInput
    placeholder="Place Name"
    value={props.placeData.value}
    onChangeText={props.onChangeText}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
  />
);

export default PlaceInput;
