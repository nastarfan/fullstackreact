import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Avatar from './components/Avatar';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Avatar initials={"AS"} size={35} backgroundColor={"blue"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
