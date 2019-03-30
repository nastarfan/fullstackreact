import { createStackNavigator, createAppContainer } from 'react-navigation';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import colors from './utils/colors';

const AppNavigator = createStackNavigator({
  Contacts: {
    screen: Contacts,
    navigationOptions: {
      title: 'Contacts',
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation: { state: { params } } }) => {
      const { contact: { name } } = params;
      return {
        title: name.split(' ')[0],
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.blue,
        }
      }
    }
  },
});

export default createAppContainer(AppNavigator);
