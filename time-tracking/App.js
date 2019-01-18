import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import uuidv4 from "uuid/v4";

import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";
import { newTimer } from "./utils/TimerUtils";

export default class App extends React.Component {
  state = {
    timers: [
      {
        id: uuidv4(),
        title: "Mown the lawn",
        project: "Hourse Chores",
        elapsed: "8986300",
        isRunning: true
      },
      {
        id: uuidv4(),
        title: "Bake squash",
        project: "Kitchen Chores",
        elapsed: "3986385",
        isRunning: true
      }
    ]
  };

  handleCreateFormSubmit = timer => {
    // update state with the new timer added
    const { timers } = this.state;
    this.setState({
      timers: [newTimer(timer), ...timers]
    });
  };

  handleUpdateFormSubmit = attrs => {
    // check the id, find in array with the same id, update values, update state
    const { timers } = this.state;

    this.setState({
      timers: timers.map(timer => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;

          // return that particular timer object with updated title and project
          return {
            ...timer,
            title,
            project
          };
        }

        // return the same timer object without changing anything
        return timer;
      })
    });
  };

  handleRemoveFormSubmit = timerId => {
    // take timers array, find the timer object based on id, remove the object from array, update state with new array
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId)
    });
  };

  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timer</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit} />
          {timers.map(({ id, title, project, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
              onFormSubmit={this.handleUpdateFormSubmit}
              onRemovePress={this.handleRemoveFormSubmit}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA"
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  timerList: {
    paddingBottom: 15
  }
});
