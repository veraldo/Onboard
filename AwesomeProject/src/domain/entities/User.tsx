export default class User {
  email?: string;
  password?: string;
  id?: string;
  role?: string;
  name?: string;
  token?: string

  constructor(id?:string,email?:string,role?:string,name?:string,token?:string){
    this.id = id;
    this.email = email;
    this.role = role;
    this.name = name;
    this.token = token
  };
}
