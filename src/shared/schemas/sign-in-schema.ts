import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(6, 'Mínimo de 6 caracteres'),
});

export type SignInSchema = Yup.InferType<typeof signInSchema>;
