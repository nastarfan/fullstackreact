import React, { Component } from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

export default class SearchInput extends Component {

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        autoCorrect={false}
        placeholder={this.props.placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});
