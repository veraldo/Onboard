import {  createStackNavigator} from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';

const App = createStackNavigator(
  {
    Home: { 
      screen: HomeScreen,
      header: null
    },
    Login: { 
      screen: LoginScreen,
      header: 'Entrar'
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default App;
