import React, {Component} from 'react';
import {ColorPropType, View, Text} from 'react-native';
import PropTypes from 'prop-types';

export default function Avatar({initials, size, backgroundColor}){
  const style = {
    width: size,
    height: size,
    backgroundColor: backgroundColor
    borderRadius: size/2
  }
  return(<View style={style}>
  </View>)
}

const styles = StyleSheet.create({

});

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  backgroundColor: ColorPropType.isRequired
};
