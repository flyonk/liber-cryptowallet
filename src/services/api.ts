// TODO: API
import { useAccountStore } from '@/stores/account';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const BASE_URL = process.env.VUE_APP_BASE_API_URL;

class ApiService {
  /**
   * ApiService Service Instance
   *
   * @private
   * @static
   * @type {ApiService}
   * @memberof ApiService
   */
  private static _instance: ApiService;

  private baseURL = 'https://blocks.demo1.pontem.network';
  // keeping in mind making it private and wrap api work in separate services
  public fetch: AxiosInstance;

  private constructor() {
    if (BASE_URL) {
      this.baseURL = BASE_URL;
    }

    this.fetch = axios.create({
      baseURL: this.baseURL,
    });

    this.fetch.interceptors.request.use((config) => {
      const store = useAccountStore();
      const token = store.token;

      if (token) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    this.fetch.interceptors.response.use(
      (_response: AxiosResponse<any, any>) => {
        console.debug(_response);
        return _response;
      },
      (error: any): Promise<any> => {
        // TODO: #1 Update Auth token if its required
        return Promise.reject(error);
      }
    );
  }

  /**
   * Returns Api Service singleton instance
   *
   * @static
   * @returns {ApiService}
   * @memberof ApiService
   */
  static getInstance(): ApiService {
    return this._instance || (this._instance = new this());
  }

  // Public functions
}

export default ApiService.getInstance();