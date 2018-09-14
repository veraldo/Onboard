import IDatabase from './interface/IDatabase';
import User from '../domain/entities/User';
import { GetParams, MessageBody } from '../domain/useCases/interface/QueryModels';

export default class UserDAO implements IDatabase<GetParams,User>{

  public async getList(query:GetParams) {
    let data = [{}];
    await fetch(`https://tq-template-server-sample.herokuapp.com/users?pagination={"page":${query.page},"window":${query.window}}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': query.token
      }
    }).then(
      (response: any) => { data = JSON.parse(response._bodyText).data })
      .catch((error) => { console.log(error) });

    let userList = data.map((data:any)=>{
      return new User(data.id,data.email, data.role, data.name);
    })
    return userList;
  }

  public async get(query: GetParams) {
    let data:any;
    await fetch(`https://tq-template-server-sample.herokuapp.com/users/${query.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': query.token
      }
    }).then(
      (response: any) => { data = JSON.parse(response._bodyText).data })
      .catch((error) => { console.log(error) });

    return new User(data.id,data.email, data.role, data.name);
  }

  public async add(user: User){
    let response : MessageBody = {};

    await fetch(`https://tq-template-server-sample.herokuapp.com/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': user.token || ""
      },
      body: JSON.stringify({
        name: user.name,
        password: user.password,
        email: user.email,
        role: user.role,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.data) {
          response.id = responseJson.data.id;
      } else {
          response.errorMessage = responseJson.errors[0].message;
      };
    })
    .catch((error) => {
      response.errorMessage = error;
    });

    return response;
  }

  public async edit(request: MessageBody){
    let response : MessageBody = {};
    await fetch(`https://tq-template-server-sample.herokuapp.com/users/${request.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': request.token || ""
      },
      body: JSON.stringify({
        name: request.name,
        email: request.email,
        role: request.role,
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.data) {
        response.id = responseJson.data.id;
        }
      else {
          response.errorMessage = responseJson.errors[0].message;
        };
      }
    )
    .catch((error) => {
      response.errorMessage = error;
    });
    return response;
  }
}
