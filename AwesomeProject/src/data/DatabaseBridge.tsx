import UserDAO from './UserDAO'
import LoginUtils from './LoginUtils';

export default class DatabaseBridge{
  static getDAO(){
    return new UserDAO();
  };
  static getLogin(){
    return new LoginUtils();
  }
}
