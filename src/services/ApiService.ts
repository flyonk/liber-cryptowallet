// import { IApiServiceState } from './../stores/apiService';
import { IApiService } from './../types/IApiService';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useApiServiceStore } from '@/stores/apiService';
//config
const BASE_URL = process.env.VUE_APP_BASE_API_URL;

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

    baseURL = "";

    private reqCount = 0;
    private resCount = 0;
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
            this.incrReqCount()
            return config;
        });

        this.fetch.interceptors.response.use(
            (_response: AxiosResponse<any, any>) => {
                this.decrReqCount()
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
    incrReqCount() {
        const store = useApiServiceStore();
        store.incReqCount();
    }

    decrReqCount() {
        const store = useApiServiceStore();
        store.decResCount();
    }
}

export default ApiService.getInstance();