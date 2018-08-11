import { createSwitchNavigator } from 'react-navigation';

// screens 
import loggedOutScreen from './screens/loggedOutScreen';
import loggedInScreen from './screens/loggedInScreen';

export const rootNav = createSwitchNavigator({
  LoggedOut: {
    screen: loggedOutScreen
  },
  LoggedIn: {
    screen: loggedInScreen
  }
},
  {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'LoggedOut'
  }
);