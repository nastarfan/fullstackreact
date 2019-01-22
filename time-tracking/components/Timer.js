import React, { Component } from "react";
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from "react-native";

import { millisecondsToHuman } from "../utils/TimerUtils";
import TimerButton from "./TimerButton";

export default class Timer extends Component {
  static proptypes: {
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired,
      elapsed: PropTypes.number.isRequired,
      isRunning: PropTypes.bool.isRequired,
      onEditPress: PropTypes.func.isRequired,
      onRemovePress: PropTypes.func.isRequired,
      onStartPress: PropTypes.func.isRequired,
      onStopPress: PropTypes.func.isRequired
  };

  handleRemovePress = () => {
    const { id, onRemovePress } = this.props;

    // we don't need to provide the whole object, id for identifier should suffice
    onRemovePress(id);
  };

  handleStartPress = () => {
    const { id, onStartPress } = this.props;

    onStartPress(id);
  };

  handleStopPress = () => {
    const { id, onStopPress } = this.props;

    onStopPress(id);
  };

  renderActionButton = () => {
    const { isRunning } = this.props;
    return (
      <TimerButton
        color={isRunning ? "red" : "green"}
        title={isRunning ? "Stop" : "Start"}
        onPress={isRunning ? this.handleStopPress : this.handleStopPress}
      />
    );
  };

  render() {
    const { title, project, elapsed, onEditPress } = this.props;
    const elapsedString = millisecondsToHuman(elapsed);

    return (
      <View style={styles.timerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>{project}</Text>
        <Text style={styles.elapsedTime}>{elapsedString}</Text>
        <View style={styles.buttonGroup}>
          <TimerButton color="blue" title="Edit" small onPress={onEditPress} />
          <TimerButton
            color="blue"
            title="Remove"
            small
            onPress={this.handleRemovePress}
          />
        </View>
        {this.renderActionButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: "white",
    borderColor: "#d6d7da",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0
  },
  title: {
    fontSize: 14,
    fontWeight: "bold"
  },
  elapsedTime: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
