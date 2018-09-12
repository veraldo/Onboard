export default class DataUtils {

  public static async getUserList(page: number, window: number, token: string) {
    let data = [{}];
    await fetch(`https://tq-template-server-sample.herokuapp.com/users?pagination={"page":${page.toString()},"window":${window.toString()}}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(
      (response: any) => { data = JSON.parse(response._bodyText).data })
      .catch((error) => { console.log(error) });

    return data;
  }

  public static async getUserDetails(id: string, token: string) {
    if(id == null || id == undefined) throw new Error();
    let data = {};
    await fetch(`https://tq-template-server-sample.herokuapp.com/users/${id.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(
      (response: any) => { data = JSON.parse(response._bodyText).data })
      .catch((error) => { console.log(error) });

    return data;
  }

  public static async addUser(name:string, role:string, email:string, password:string, token: string){
    let response = fetch(`https://tq-template-server-sample.herokuapp.com/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
        role: role,
      })
    }).then(
      (response: any) => { return response})
      .catch((error:any) => { console.log(error) });

    return response;
  }
}
