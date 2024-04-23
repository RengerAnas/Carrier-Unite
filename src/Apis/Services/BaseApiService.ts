import axios, { AxiosRequestConfig } from "axios";
import { store } from "../../Store/Store";
import { BASE_URL } from "../../constants/API.Constants";

class BaseApiService {
  constructor() {
    this.myAxios.interceptors.request.use((config) => {
      return config;
    });

    this.myAxios.interceptors.response.use((config) => {
      config.status = 401;
      // TODO: Add logic to handle 401 errors
      return config;
    });
  }

  getDefaultApiUrl() {
    return BASE_URL;
  }

  getToken() {
    return store.getState().userData.token;
  }

  myAxios = axios.create({
    baseURL: this.getDefaultApiUrl(),
  });

  transformRequestData(data: Record<string, unknown>) {
    const params = new FormData();
    for (const key in data) {
      params.append(key, data[key]);
    }
  }

  async callApiWithToken(config: AxiosRequestConfig) {
    try {
      const token = store.getState().userData.token;
      return await this.myAxios({
        ...config,
        headers: {
          Authentication: token,
        },
      });
    } catch (error) {
      console.log("🚀 ~ file: BaseApiService.ts:38 ~ BaseApiService ~ callApiWithToken ~ error:", error);
      return Promise.reject(error);
    }
  }
  get(url: string) {
    return this.callApiWithToken({ method: "GET", url });
  }
  post(url: string, data: Record<string, unknown>) {
    return this.callApiWithToken({ method: "POST", url, data });
  }
}

export default BaseApiService;

export const Api = new BaseApiService();
