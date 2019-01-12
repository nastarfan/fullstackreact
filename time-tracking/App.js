import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import uuidv4 from "uuid/v4";

import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";

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
  render() {
    const { timers } = this.state;
    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timer</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm />
          {timers.map(({ id, title, project, elapsed, isRunning }) => (
            <EditableTimer
              key={id}
              id={id}
              title={title}
              project={project}
              elapsed={elapsed}
              isRunning={isRunning}
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
