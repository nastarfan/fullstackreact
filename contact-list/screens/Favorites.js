import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import store from '../store';

import { fetchContacts } from '../utils/api';

import ContactThumbnail from '../components/ContactThumbnail';

const keyExtractor = ({ phone }) => phone;

export default class Favorites extends Component {
  static navigationOptions = {
    title: 'Favorites',
  };

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  componentDidMount = async () => {
    const { contacts } = this.state;

    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error,
      }),
    );

    if (contacts === 0) { // if the contacts happen to be haven't been fetched
      const contacts = await fetchContacts();

      store.setState({ contacts, isFetchingContacts: false });
    }
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderFavoriteThumbnail = ({ item }) => {
    const {
      navigation: { navigate },
    } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate('Profile', { contact: item })}
      />
    );
  };

  render() {
    const { contacts, loading, error } = this.state;
    // return contact which has favorite property is set to true
    const favorites = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error</Text>}

        {!loading && !error && (
          <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={this.renderFavoriteThumbnail}
          />
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
  list: {
    alignItems: 'center',
  },
});
