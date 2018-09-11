import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';
import WelcomeScreen from './src/components/WelcomeScreen';
import DetailsScreen from './src/components/DetailsScreen';

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
    },
    Details:{
      screen: DetailsScreen,
      header:'Details'
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default App;
