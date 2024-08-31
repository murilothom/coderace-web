import { Api } from '../../lib/api';
import { ResetPasswordSchema } from '../schemas/reset-password-schema';
// import { ChangePasswordSchema } from '../schemas/change-password-schema';
import { SaveEmployeeSchema } from '../schemas/save-employee-schema';
// import { ResetPasswordSchema } from '../schemas/reset-password-schema';
import { Employee } from '../types/Employee';
import authService from './auth-service';

export class EmployeesService {
  private readonly baseURL = `${import.meta.env.VITE_BACKEND_URL}/colaborador`;

  constructor(private service: Api) {}

  public getEmployeeById = (id: string): Promise<Employee> => {
    const token = authService.getToken();

    return this.service
      .get(`${this.baseURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public getCurrentEmployee = (): Promise<Employee> => {
    const token = authService.getToken();

    return this.service
      .get(`${this.baseURL}/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public getAll = (): Promise<Employee[]> => {
    const token = authService.getToken();

    return this.service
      .get(this.baseURL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((x) => x.data);
  };

  public create = async (data: SaveEmployeeSchema): Promise<void> => {
    const token = authService.getToken();

    await this.service.post(this.baseURL, data, {
      headers: {
        ...(token !== null ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };

  public update = async (
    id: string,
    data: SaveEmployeeSchema,
  ): Promise<void> => {
    const token = authService.getToken();

    await this.service.put(`${this.baseURL}/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  public updatePassword = async (data: ResetPasswordSchema): Promise<void> => {
    const token = authService.getToken();

    await this.service.patch(`${this.baseURL}/senha`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  public delete = async (id: string): Promise<void> => {
    const token = authService.getToken();

    await this.service.delete(`${this.baseURL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
}

const service = new Api();
const employeesService = new EmployeesService(service);
export default employeesService;
