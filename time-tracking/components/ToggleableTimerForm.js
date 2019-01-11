import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import TimerButton from "./TimerButton";

export default class ToggleableTimerForm extends Component {
  state = {
    isOpen: false
  };

  handleOpenForm = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { isOpen } = this.state;
    
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
