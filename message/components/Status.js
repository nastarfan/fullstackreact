import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  NetInfo,
  Platform,
  StatusBar
} from "react-native";
import { Constants } from "expo";

const statusHeight = Platform.OS === "ios" ? Constants.statusBarHeight : 0;

export default class Status extends Component {
  state = {
    info: "null"
  };

  async componentWillMount() {
    this.subscription = NetInfo.addEventListener(
      "connectionChange",
      this.handleChange
    );

    const info = await NetInfo.getConnectionInfo();

    this.setState({ info });

    // setInterval(() => {
    //   if (this.state.info != "none") {
    //     this.handleChange("none");
    //   } else {
    //     this.handleChange("cellular");
    //   }
    // }, 3000);
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  handleChange = info => {
    this.setState({ info });
  };

  render() {
    const { info } = this.state;

    const isConnected = info !== "none";
    const backgroundColor = isConnected ? "white" : "red";

    const statusBar = (
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isConnected ? "dark-content" : "light-content"}
        animated={false}
      />
    );

    const messageContainer = (
      <View style={styles.messageContainer} pointerEvents={"none"}>
        {statusBar}
        {!isConnected && (
          <View style={styles.bubble}>
            <Text style={styles.text}>No network connection</Text>
          </View>
        )}
      </View>
    );

    if (Platform.OS === "ios") {
      // render solid color manually on ios
      return (
        <View style={[styles.status, { backgroundColor }]}>{statusBar}</View>
      );
    }

    return messageContainer;
  }
}

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight
  },
  messageContainer: {
    zIndex: 1,
    position: "absolute",
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: "center",
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red"
  },
  text: {
    color: "white"
  }
});
