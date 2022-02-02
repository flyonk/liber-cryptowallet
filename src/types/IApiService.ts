import { AxiosInstance } from "axios";

export interface IApiService {
    baseURL: string;
    fetch: AxiosInstance;
    incrReqCount():void;
    decrReqCount():void;
}
