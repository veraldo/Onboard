export default interface ILogin<REQUEST, RESPONSE> {
  doLogin(request: REQUEST) : Promise<RESPONSE>;
}
