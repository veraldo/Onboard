import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';
import WelcomeScreen from './src/components/WelcomeScreen';
import DetailsScreen from './src/components/DetailsScreen';
import CreateScreen from './src/components/CreateScreen';
import EditScreen from './src/components/EditScreen'

let App = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      header: null
    },
    Login: {
      screen: LoginScreen,
      title: 'Entrar'
    },
    Welcome: {
      screen: WelcomeScreen,
      title: 'Bem-vindo'
    },
    Details:{
      screen: DetailsScreen,
      title:'Detalhes'
    },
    Create:{
      screen:CreateScreen,
      title: 'Criar'
    },
    Edit:{
      screen:EditScreen,
      title: 'Editar'
    }
  },
  {
    initialRouteName: "Home"
  }
);

export default App;
