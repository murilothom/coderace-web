import * as Yup from 'yup';

export const recoverPasswordByEmailSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});

export type RecoverPasswordByEmailSchema = Yup.InferType<
  typeof recoverPasswordByEmailSchema
>;
