import * as Yup from 'yup';

export const saveEmployeeSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  sector: Yup.string().required('Setor é obrigatório'),
  role: Yup.string().required('Função é obrigatória'),
});

export type SaveEmployeeSchema = Yup.InferType<typeof saveEmployeeSchema>;
