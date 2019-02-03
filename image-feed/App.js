import React from "react";
import { Constants } from "expo";
import { Modal, Platform, StyleSheet, View } from "react-native";

import Feed from "./screens/Feed";
import Comments from "./screens/Comments";

export default class App extends React.Component {
  state = {
    commentsForItem: {},
    showModal: false,
    selectedItemId: null
  };

  openCommentScreen = id => {
    this.setState({
      showModal: true,
      selectedItemId: id
    });
  };

  closeCommentScreen = () => {
    this.setState({
      showModal: false,
      selectedItemId: null
    });
  };

  onSubmitComment = comment => {
    const { selectedItemId, commentsForItem } = this.state;
    const comments = commentsForItem[selectedItemId] || [];

    const updated = {
      ...commentsForItem,
      [selectedItemId]: [...comments, comment]
    };

    this.setState({
      commentsForItem: updated
    });
  };

  render() {
    const { commentsForItem, showModal, selectedItemId } = this.state;

    return (
      <View style={styles.container}>
        <Feed
          style={styles.feed}
          commentsForItem={commentsForItem}
          onPressComment={this.openCommentScreen}
        />

        <Modal
          visible={showModal}
          animationType="slide"
          onRequestClose={this.closeCommentScreen}
        >
          <Comments
            comments={commentsForItem[selectedItemId] || []}
            onClose={this.closeCommentScreen}
            style={styles.comments}
            onSubmitComment={this.onSubmitComment}
          />
        </Modal>
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
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === "ios" && platformVersion < 11
        ? Constants.statusBarHeight
        : 0
  }
});
