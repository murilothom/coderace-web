import { Api } from '../../lib/api';
import authService from './auth-service';

export type AiFeedbackResponse = Record<string, string>;

export class AiService {
  private readonly baseURL = `https://ai.empsolucoes.site`;

  constructor(private service: Api) {}

  public get = (): Promise<AiFeedbackResponse> => {
    const token = authService.getToken();

    return this.service
      .post(
        `${this.baseURL}/processar`,
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
const aiService = new AiService(service);
export default aiService;
