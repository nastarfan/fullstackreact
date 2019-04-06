import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Placeholder from 'rn-placeholder';

import colors from '../utils/colors';

export default class ContactListPlaceholder extends Component {
  render() {
    const { onReady } = this.props;

    let rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(
        <View style={styles.contactInfo} key={i}>
          <Placeholder.Media
            color="#d5d5d5"
            animate="fade"
            size={44}
            hasRadius
            onReady={onReady}
          />
          <View style={styles.details}>
            <Placeholder.Line
              color="#d5d5d5"
              animate="fade"
              width="80%"
              onReady={onReady}
            />
            <Placeholder.Line
              color="#d5d5d5"
              animate="fade"
              width="60%"
              onReady={onReady}
              style={{ marginTop: 4 }}
            />
          </View>
        </View>,
      );
    }
    return <ScrollView style={styles.container}>{rows}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 24,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
  },
});
