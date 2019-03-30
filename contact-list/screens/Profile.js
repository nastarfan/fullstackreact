import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';

import { fetchRandomContact } from '../utils/api';
import colors from '../utils/colors';

export default class Profile extends Component {
  state = {
    contact: {},
    loading: true,
  };

  componentDidMount = async () => {
    const contact = await fetchRandomContact();
    console.log(contact);
    this.setState({ contact, loading: false });
  };

  render() {
    const { name, email, phone, cell, avatar } = this.state.contact;
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        {!loading && (
          <View style={styles.avatarSection}>
            <ContactThumbnail
              name={name}
              phone={phone}
              avatar={avatar}
              onPress={() => {}}
            />
          </View>
        )}
        {!loading && (
          <View style={styles.detailSection}>
            <DetailListItem icon="mail" title="Email" subtitle={email} />
            <DetailListItem icon="phone" title="Phone" subtitle={phone} />
            <DetailListItem
              icon="smartphone"
              title="Personal"
              subtitle={cell}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});
