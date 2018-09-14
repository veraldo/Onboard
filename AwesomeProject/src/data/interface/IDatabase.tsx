
export default interface IDatabase<REQUEST, RESPONSE> {
  get(request: REQUEST) : Promise<RESPONSE>;
  getList(request: REQUEST) : Promise<RESPONSE[]>;
  add(request: REQUEST) : Promise<RESPONSE>;
  edit(request: REQUEST) : Promise<RESPONSE>;
}
