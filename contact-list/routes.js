import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';

import colors from './utils/colors';

const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactsScreens = createAppContainer(
  createStackNavigator(
    {
      Contacts: {
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
  ),
);

const FavoritesScreens = createAppContainer(
  createStackNavigator(
    {
      Contacts: {
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
  ),
);

const UserScreens = createAppContainer(
  createStackNavigator(
    {
      User: {
        screen: User,
      },
    },
    {
      initialRouteName: 'User',
      navigationOptions: {
        tabBarIcon: getTabBarIcon('person'),
      },
    },
  ),
);

const AppNavigator = createBottomTabNavigator(
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
