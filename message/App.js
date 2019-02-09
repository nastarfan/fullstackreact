import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import Status from "./components/Status";
import MessageList from "./components/MessageList";
import {
  MessageShape,
  createTextMessage,
  createImageMessage,
  createLocationMessage
} from "./utils/MessageUtils";

export default class App extends Component {
  state = {
    messages: [
      createTextMessage("Hello"),
      createTextMessage("World"),
      createImageMessage("https://unsplash.it/300/300"),
      createImageMessage("https://unsplash.it/300/300"),
      createLocationMessage({
        latitude: -6.196785,
        longitude: 106.684682
      })
    ]
  };

  renderMessageList = () => {
    const { messages } = this.state;
    return (
      <View style={styles.content}>
        <MessageList messages={messages} />
      </View>
    );
  };

  renderToolbar = () => {
    return <View style={styles.toolbar} />;
  };

  renderInputMethodEditor = () => {
    return <View style={styles.inputMethodEditor} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessageList()}
        {this.renderToolbar()}
        {this.renderInputMethodEditor()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1,
    backgroundColor: "white"
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: "white"
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "white"
  }
});
