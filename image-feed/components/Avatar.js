import React, { Component } from "react";
import { ColorPropType, View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default function Avatar({ initials, size, backgroundColor }) {
  const style = {
    width: size,
    height: size,
    backgroundColor: backgroundColor,
    borderRadius: size / 2
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
  }
});

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  backgroundColor: ColorPropType.isRequired
};
