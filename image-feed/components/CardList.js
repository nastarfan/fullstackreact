import React, { Component } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { getImageFromId } from "../utils/api";
import Card from "./Card";

export default class CardList extends Component {
  const keyExtractor = ({id}) => id.toString();
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired
      }),
    ).isRequired,
  };

  render(){
    return();
  }
}
