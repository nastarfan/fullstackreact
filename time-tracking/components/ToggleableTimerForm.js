import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from "react-native";

import TimerButton from "./TimerButton";
import TimerForm from "./TimerForm";

export default class ToggleableTimerForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired
  }

  state = {
    isOpen: false
  };

  handleOpenForm = () => {
    this.setState({ isOpen: true });
  };

  handleFormSubmit = timer => {
    const { onFormSubmit } = this.props;

    onFormSubmit(timer);
    this.setState({ isOpen: false });
  };

  handleFormClose = () => {
    console.log("bummer");
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm
            onFormSubmit={this.handleFormSubmit}
            onFormClose={this.handleFormClose}
          />
        ) : (
          <TimerButton title="+" color="black" onPress={this.handleOpenForm} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10
  },
  buttonPadding: {
    paddingHorizontal: 15
  }
});
