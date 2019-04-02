import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import ContactListItem from '../components/ContactListItem';

import { fetchContacts } from '../utils/api';

import colors from '../utils/colors';

const keyExtractor = ({ phone }) => phone;

export default class Contact extends Component {
  static navigationOptions = ({ navigation: { toggleDrawer } }) => ({
    title: 'Contacts',
    headerLeft: (
      <MaterialIcons
        name="menu"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => toggleDrawer()}
      />
    ),
  });

  state = {
    contacts: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      const contacts = await fetchContacts();

      this.setState({
        contacts,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

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
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            renderItem={this.renderContact}
            keyExtractor={keyExtractor}
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
});
