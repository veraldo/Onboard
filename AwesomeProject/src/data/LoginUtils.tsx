import { MessageBody } from "../domain/useCases/interface/QueryModels"
import ILogin from "./interface/LoginService";

export default class LoginUtils implements ILogin<MessageBody,MessageBody>{

  public async doLogin(loginBody: MessageBody) {
    let response: MessageBody = {

    }
    await fetch('https://tq-template-server-sample.herokuapp.com/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: loginBody.password,
        email: loginBody.email,
        rememberMe: loginBody.rememberMe
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.data) {
          response.name = responseJson.data.user.name,
            response.token = responseJson.data.token
        } else {
          response.errorMessage = responseJson.errors[0].message;

        }
      })
      .catch((error) => {
        response.errorMessage = error;
      });
    return response;
  }
}
