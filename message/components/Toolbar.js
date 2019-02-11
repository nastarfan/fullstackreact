import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from "react-native";
import PropTypes from "prop-types";

const ToolbarButton = ({ title, onPress }) => {
  <TouchableHighlight onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableHighlight>;
};

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default class Toolbar extends Component {
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    onChangeFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func
  };

  static defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    onPressLocation: () => {}
  };

  render() {
    const {onPressCamera, onPressLocation} = this.props;

    return (<View style={styles.toolbar}>
      <ToolbarButton title={"📷"} onPress={onPressCamera}/>
      <ToolbarButton title={"📍"} onPress={onPressLocation}/>
      </View>;)
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: "white"
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: "grey"
  }
});
