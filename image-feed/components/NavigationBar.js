import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default function NavigationBar extends {
    return();
}

NavigationBar.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  onPressLeftText: PropTypes.func
};

NavigationBar.defaultProps = {
  title: '',
  leftText: '',
  onPressLeftText: () => {}
};

const style = StyleSheet.Create({

});
