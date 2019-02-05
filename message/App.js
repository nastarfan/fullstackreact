import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
  renderMessageList = () => {
    return(
      <View style={styles.content}></View>
    );
  }

  renderToolbar = () => {
    return(
      <View style={styles.toolbar}></View>
    );
  }

  renderInputMethodEditor = () => {
    return(
      <View style={styles.inputMethodEditor}></View>
    );
  }


  render() {
    return (
      {this.renderMessageList()}
      {this.renderToolbar()}
      {this.renderInputMethodEditor()}
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex:1,
    backgroundColor: 'white'
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white'
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.4)',
    backgroundColor: 'white',
  }
});
