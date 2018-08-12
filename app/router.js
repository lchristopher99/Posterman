import { createSwitchNavigator } from 'react-navigation';

// screens 
import loggedOutScreen from './screens/loggedOutScreen';
import loggedInScreen from './screens/loggedInScreen';
import newAccountScreen from './screens/newAccountScreen';

export const rootNav = createSwitchNavigator({
  LoggedOut: {
    screen: loggedOutScreen
  },
  LoggedIn: {
    screen: loggedInScreen
  },
  NewAccount: {
    screen: newAccountScreen
  }
},
  {
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'LoggedOut'
  }
);