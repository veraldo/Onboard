import UseCase from './interface/UseCase';
import User from '../entities/User';
import DatabaseBridge from '../../data/DatabaseBridge'
import { GetParams, } from './interface/QueryModels';
export default class GetUserListUseCase implements UseCase<GetParams, User[]>{

  async exec(query: GetParams){
    return DatabaseBridge.getDAO().getList(query);
  }

}
