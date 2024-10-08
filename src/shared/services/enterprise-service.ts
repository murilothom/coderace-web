import { Api } from '../../lib/api';
import { CreateEnterpriseSchema } from '../schemas/create-enterprise-schema';
import { Enterprise } from '../types/Enterprise';
import authService from './auth-service';

type Result = {
  responses: Record<string, string>;
  sector: string;
};

export class EnterprisesService {
  private readonly baseURL = `${import.meta.env.VITE_BACKEND_URL}/empresa`;

  constructor(private service: Api) {}

  public getCurrentEnterprise = (): Promise<Enterprise> => {
    const token = authService.getToken();

    return this.service
      .get(`${this.baseURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public getEnterpriseSectors = (): Promise<{ sector: string }[]> => {
    const token = authService.getToken();

    return this.service
      .get(`${this.baseURL}/setores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public getSectorInsight = (sector: string): Promise<Result[]> => {
    const token = authService.getToken();

    return this.service
      .get(`${this.baseURL}/setores/${sector}/insight`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public create = async (data: CreateEnterpriseSchema): Promise<void> => {
    const token = authService.getToken();

    await this.service.post(this.baseURL, data, {
      headers: {
        ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };
}

const service = new Api();
const enterprisesService = new EnterprisesService(service);
export default enterprisesService;
