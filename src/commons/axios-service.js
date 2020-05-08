import axios from "axios";

export class AxiosService {
  constructor() {
    const instance = axios.create({
      headers: {
        "Content-Type": "application/json",
        // access token
      },
    });

    axios.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }
  handleSuccess = (res) => {
    return res;
  };

  handleError = (error) => {
    return Promise.reject(error);
  };
  static get = (url) => this.instance.get(url);

  static post = (url, body) => this.instance.post(url, body);

  static put = (url, body) => this.instance.put(url, body);

  static delete = (url) => this.instance.delete(url);
}

