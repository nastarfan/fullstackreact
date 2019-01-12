import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import TimerForm from "./TimerForm";
import TimerButton from "./TimerButton";

export default class ToggleableTimerForm extends Component {
  state = {
    isOpen: true
  };

  handleOpenForm = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { isOpen } = this.state;
    console.log("Test");
    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm />
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
