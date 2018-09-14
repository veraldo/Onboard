import UseCase from "./interface/UseCase";
import { MessageBody } from "./interface/QueryModels";
import DatabaseBridge from "../../data/DatabaseBridge";

export default class EditUserUseCase implements UseCase<MessageBody, MessageBody>{
  public async exec(data: MessageBody) {
    return DatabaseBridge.getDAO().edit(data);

  }

}
