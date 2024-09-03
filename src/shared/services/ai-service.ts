import { Api } from '../../lib/api';
import authService from './auth-service';

export type AiFeedbackResponse = Record<string, string>;

export class AiService {
  private readonly baseURL = import.meta.env.VITE_IA_URL;

  constructor(private service: Api) {}

  public get = (id: string): Promise<AiFeedbackResponse> => {
    return this.service
      .get(`${this.baseURL}/processar/${id}`)
      .then((x) => x.data);
  };
}

const service = new Api();
const aiService = new AiService(service);
export default aiService;
