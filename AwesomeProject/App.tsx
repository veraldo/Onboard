import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';
import WelcomeScreen from './src/components/WelcomeScreen';


const App = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      header: null
    },
    Login: {
      screen: LoginScreen,
      headerTitle: 'Entrar'
    },
    Welcome: {
      screen: WelcomeScreen,
      headerTitle: 'Bem-vindo'
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default App;
