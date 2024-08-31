import * as Yup from 'yup';

export const createEnterpriseSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  enterpriseName: Yup.string().required('Nome da empresa é obrigatório'),
  sector: Yup.string().required('Setor é obrigatório'),
  document: Yup.string()
    .required('CNPJ é obrigatório')
    .length(14, 'CNPJ inválido'),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'Mínimo de 6 caracteres'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'Mínimo de 6 caracteres')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
    .test('passwords-match', 'As senhas devem ser iguais', function (value) {
      const { newPassword } = this.parent;
      return !newPassword || !value || newPassword === value;
    }),
});

export type CreateEnterpriseSchema = Yup.InferType<
  typeof createEnterpriseSchema
>;
