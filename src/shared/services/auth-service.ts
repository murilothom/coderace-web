import { Api } from '../../lib/api';
import type { ChangePasswordSchema } from '../schemas/change-password-schema';
import type { RecoverPasswordByEmailSchema } from '../schemas/recover-password-by-email-schema';
import type { SignInSchema } from '../schemas/sign-in-schema';

export class AuthService {
  private readonly baseURL = `https://app.empsolucoes.site/autenticacao`;
  private readonly TOKEN_KEY = '@EMP-TOKEN';

  constructor(private service: Api) {}

  public recoverPasswordByEmail = async (
    data: RecoverPasswordByEmailSchema,
  ) => {
    await this.service.post(
      `${this.baseURL}/recuperar-senha/${data.email}`,
      data,
    );
  };

  public changePasswordByEmail = async (
    code: string,
    email: string,
    data: ChangePasswordSchema,
  ) => {
    await this.service.patch(
      `${this.baseURL}/recuperar-senha/${email}?code=${code}`,
      data,
    );
  };

  public login = async (data: SignInSchema) => {
    const { access_token } = await this.service
      .post(this.baseURL, data)
      .then((x) => x.data);
    localStorage.setItem(this.TOKEN_KEY, access_token);
  };

  public logout = (): void => {
    localStorage.removeItem(this.TOKEN_KEY);
  };

  public isAuthenticated = (): boolean => {
    return localStorage.getItem(this.TOKEN_KEY) !== null;
  };

  public getToken = (): string | null => {
    return localStorage.getItem(this.TOKEN_KEY);
  };
}

const service = new Api();
const authService = new AuthService(service);
export default authService;
