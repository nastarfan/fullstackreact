import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Profile />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
