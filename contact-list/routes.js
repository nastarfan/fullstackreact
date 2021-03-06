import React, { Component } from 'react';
import {
  createMaterialTopTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';

import colors from './utils/colors';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreens = createStackNavigator(
  {
    Contacts: { // can be written Contacts: Contacts with further shorthand to be just Contacts
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Contacts',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('list'),
    },
  },
);

const FavoritesScreens = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Profile: {
      screen: Profile,
    },
  },
  {
    initialRouteName: 'Favorites',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('star'),
    },
  },
);

const UserScreens = createStackNavigator(
  {
    User: {
      screen: User,
    },
    Options: {
      screen: Options,
    },
  },
  {
    initialRouteName: 'User',
    mode: 'modal',
    navigationOptions: {
      tabBarIcon: getTabBarIcon('person'),
    },
  },
);

const AppNavigator = createMaterialTopTabNavigator(
  {
    Contacts: {
      screen: ContactsScreens,
    },
    Favorites: {
      screen: FavoritesScreens,
    },
    User: {
      screen: UserScreens,
    },
  },
  {
    initialRouteName: 'Contacts',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight,
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark,
      renderIndicator: () => null,
    },
  },
);

export default createAppContainer(AppNavigator);
