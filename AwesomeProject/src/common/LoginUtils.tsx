import { AsyncStorage } from 'react-native';


export default class LoginUtils {

  public static async doLogin(email: string, password: string, rememberMe: boolean){
    return fetch('https://tq-template-server-sample.herokuapp.com/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
        rememberMe: rememberMe
      }),
    });

  }

}
