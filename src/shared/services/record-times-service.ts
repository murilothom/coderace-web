import { Api } from '../../lib/api';
import authService from './auth-service';

export class RecordTimesService {
  private readonly baseURL = `https://app.empsolucoes.site/registro-ponto`;

  constructor(private service: Api) {}

  public getRecordTimesToday = (): Promise<number> => {
    const token = authService.getToken();

    return this.service
      .get(`${this.baseURL}/hoje`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public registerRecordTime = (): Promise<void> => {
    const token = authService.getToken();

    return this.service
      .post(
        `${this.baseURL}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((x) => x.data);
  };
}

const service = new Api();
const recordTimesService = new RecordTimesService(service);
export default recordTimesService;
