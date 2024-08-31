import { Api } from '../../lib/api';
import { Question } from '../types/Question';
import authService from './auth-service';

export class FeedbackService {
  private readonly baseURL = `https://app.empsolucoes.site/feedback`;

  constructor(private service: Api) {}

  public getQuestions = (): Promise<Question[]> => {
    const token = authService.getToken();

    return this.service
      .get(`${this.baseURL}/perguntas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public sendFeedback = (data: any): Promise<void> => {
    const token = authService.getToken();

    return this.service
      .post(`${this.baseURL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };
}

const service = new Api();
const feedbackService = new FeedbackService(service);
export default feedbackService;
