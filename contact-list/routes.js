import { createStackNavigator, createAppContainer } from 'react-navigation';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import colors from './utils/colors';

const AppNavigator = createStackNavigator(
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
  },
);

export default createAppContainer(AppNavigator);
