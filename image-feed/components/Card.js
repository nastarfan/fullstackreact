import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";

import AuthorRow from "./AuthorRow";

export default class Card extends Component {
  static propTypes = {
    fullName: PropTypes.string.isRequired,
    image: Image.propTypes.source.isRequired,
    linkText: PropTypes.string,
    onPressLinkText: PropTypes.func
  };

  static defaultProps = {
    linkText: "",
    onPressLinkText: () => {}
  };

  render() {
    const { fullName, image, linkText, onPressLinkText } = this.props;
    return (
      <View>
        <AuthorRow
          fullName={fullName}
          linkText={linkText}
          onPressLinkText={onPressLinkText}
        />
        <Image style={styles.image} source={image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,0,0.02)"
  }
});
