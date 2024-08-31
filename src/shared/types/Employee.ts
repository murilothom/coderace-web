export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
}

export type Employee = {
  id: string;
  name: string;
  email: string;
  sector: string;
  role: Role;
};
