import { BASE_API_URL } from '@/constants';
import { IApiService } from '@/types/api';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useApiServiceStore } from '@/stores/apiService';
//config
const BASE_URL = BASE_API_URL;

class ApiService implements IApiService {
  /**
   * ApiService Service Instance
   *
   * @private
   * @static
   * @type {ApiService}
   * @memberof ApiService
   */
  private static _instance: ApiService;

  private store;

  baseURL = '';

  // keeping in mind making it private and wrap api work in separate services
  public fetch: AxiosInstance;

  private constructor() {
    if (BASE_URL) {
      this.baseURL = BASE_URL;
    }

    this.store = useApiServiceStore();

    this.fetch = axios.create({
      baseURL: this.baseURL,
    });

    this.fetch.interceptors.request.use((config) => {
      this.store.incReqCount();
      return config;
    });

    this.fetch.interceptors.response.use(
      (_response: AxiosResponse<unknown, unknown>) => {
        this.store.decResCount();
        console.debug(_response);
        return _response;
      },
      (error: unknown): Promise<unknown> => {
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

export default ApiService;
