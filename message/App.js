import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";

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
        <MessageList messages={messages} onPressMessage={this.handlePressMessage}/>
      </View>
    );
  };

  renderToolbar = () => {
    return <View style={styles.toolbar} />;
  };

  renderInputMethodEditor = () => {
    return <View style={styles.inputMethodEditor} />;
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case "text":
        Alert.alert(
          "Delete message?",
          "Aree you sure want to permanently delete this message?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(message => message.id !== id)
                });
              }
            }
          ]
        );
        break;
      default:
        break;
    }
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
