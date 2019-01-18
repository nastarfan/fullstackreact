import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { millisecondsToHuman } from "../utils/TimerUtils";
import TimerButton from "./TimerButton";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    const { id, title, project, elapsed } = this.props;

    this.state = {
      id,
      title,
      project,
      elapsed
    };
  }

  handleRemovePress = () => {
    const { onRemovePress } = this.props;
    const { id, title, project, elapsed } = this.state;

    onRemovePress({ id, title, project, elapsed });
  };

  render() {
    const { onEditPress } = this.props;
    const { title, project, elapsed } = this.state;
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
        <TimerButton color="#21BA45" title="Start" />
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
