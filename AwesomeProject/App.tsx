import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/presentation/HomeScreen';
import LoginScreen from './src/presentation/LoginScreen';
import WelcomeScreen from './src/presentation/WelcomeScreen';
import DetailsScreen from './src/presentation/DetailsScreen';
import CreateScreen from './src/presentation/CreateScreen';
import EditScreen from './src/presentation/EditScreen'

let App = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      header: null
    },
    Welcome: {
      screen: WelcomeScreen,
      title: 'Bem-vindo'
    },
    Login: {
      screen: LoginScreen,
      title: 'Entrar'
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
