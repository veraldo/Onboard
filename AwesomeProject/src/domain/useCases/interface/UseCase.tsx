
export default interface UseCase<REQUEST, RESPONSE> {
  exec(request: REQUEST) : Promise<RESPONSE>;
}
