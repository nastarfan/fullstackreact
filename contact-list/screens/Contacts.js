import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Placeholder from 'rn-placeholder';

import store from '../store';

import ContactListItem from '../components/ContactListItem';
import ContactListPlaceholder from '../components/ContactListPlaceholder';

import { fetchContacts } from '../utils/api';
import getURLParams from '../utils/getURLParams';

const keyExtractor = ({ phone }) => phone;

export default class Contact extends Component {
  static navigationOptions = {
    title: 'Contacts',
  };

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
      }),
    );

    const contacts = await fetchContacts();

    store.setState({ contacts, isFetchingContacts: false });

    Linking.addEventListener('url', this.handleOpenUrl);

    const url = await Linking.getInitialURL();
    this.handleOpenUrl({ url });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenUrl);
    this.unsubscribe();
  }

  handleOpenUrl = event => {
    const {
      navigation: { navigate },
    } = this.props;
    const { url } = event;
    const params = getURLParams(url);

    if (params.name) {
      const queriedContact = store
        .getState()
        .contacts.find(
          contact =>
            contact.name.split(' ')[0].toLowerCase() ===
            params.name.toLowerCase(),
        ); // find based on first name

      if (queriedContact) {
        navigate('Profile', { id: queriedContact.id });
      }
    }
  };

  renderContact = ({ item }) => {
    // {} to tell that item is a property of an object
    const {
      navigation: { navigate },
    } = this.props;
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate('Profile', { contact: item })}
      />
    );
  };

  render() {
    const { contacts, loading, error } = this.state;

    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    return (
      <View style={styles.container}>
        {error && <Text>Error</Text>}
        {!error && (
          <View>
            {loading && <ContactListPlaceholder onReady={!loading} />}
            <FlatList
              data={contactsSorted}
              renderItem={this.renderContact}
              keyExtractor={keyExtractor}
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
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
