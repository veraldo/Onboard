import UseCase from "./interface/UseCase";
import { MessageBody } from "./interface/QueryModels";
import LoginUtils from "../../data/LoginUtils"
import DatabaseBridge from "../../data/DatabaseBridge";

export default class LoginUseCase implements UseCase<MessageBody, MessageBody>{
  public async exec(loginBody: MessageBody) {
    return DatabaseBridge.getLogin().doLogin(loginBody)

  }

}
