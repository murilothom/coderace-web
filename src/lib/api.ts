import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Api {
  private axiosInstance;

  constructor() {
    this.axiosInstance = (): AxiosInstance => axios.create();
  }

  public get = async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T | any> => this.axiosInstance().get(url, config);

  public post = async <T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<T | any> => this.axiosInstance().post(url, params, config);

  public put = async <T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<T | any> => this.axiosInstance().put(url, params, config);

  public delete = async <T>(
    url: string,
    _?: any,
    config?: AxiosRequestConfig,
  ): Promise<T | any> => this.axiosInstance().delete(url, config);

  public patch = async <T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig,
  ): Promise<T | any> => this.axiosInstance().patch(url, params, config);
}