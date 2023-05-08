import axios from "axios";

interface StatusResponse {
  status: string;
}

export class JsonServerStatus {
  //Server Location
  urlBase = 'http://localhost:3004';

  async isServerOn() {
    let serverStatus = await axios.get<StatusResponse>(`${this.urlBase}/server-test`)
      .then(res => {
        if (res.status === 200) {
          return true
        }
        else {
          return false
        }
      })
      .catch(err => {
        console.log(err);
        return false
      })
    return serverStatus
  }
}