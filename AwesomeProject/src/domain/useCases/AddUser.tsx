import UseCase from "./interface/UseCase";
import { MessageBody } from "./interface/QueryModels";
import DatabaseBridge from "../../data/DatabaseBridge";
import User from "../entities/User";

export default class AddUserUseCase implements UseCase<User, MessageBody>{
  public async exec(data: User) {
    return DatabaseBridge.getDAO().add(data);
  }

}
