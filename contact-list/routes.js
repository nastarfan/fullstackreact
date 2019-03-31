import { createStackNavigator, createAppContainer } from 'react-navigation';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';

const AppNavigator = createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
    },
    Profile: {
      screen: Profile,
    },
    Favorites: {
      screen: Favorites,
    },
    User: {
      screen: User,
    },
  },
  {
    initialRouteName: 'User',
  },
);

export default createAppContainer(AppNavigator);
