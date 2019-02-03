import React from "react";
import { Constants } from "expo";
import { Platform, StyleSheet, View } from "react-native";

import Feed from "./screens/Feed";

export default class App extends React.Component {
  state = {
    commentForItem: {},
    showModal: false,
    selectedItemId: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Feed style={styles.feed} />
      </View>
    );
  }
}

const platformVersion =
  Platform.OS === "ios" ? parseInt(Platform.version, 10) : Platform.version;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === "android" || platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  }
});
