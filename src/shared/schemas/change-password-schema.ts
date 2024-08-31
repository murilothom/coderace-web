import * as Yup from 'yup';

export const changePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'Mínimo de 6 caracteres'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .min(6, 'Mínimo de 6 caracteres')
    .oneOf([Yup.ref('newPassword')], 'As senhas devem ser iguais')
    .test('passwords-match', 'As senhas devem ser iguais', function (value) {
      const { newPassword } = this.parent;
      return !newPassword || !value || newPassword === value;
    }),
});

export type ChangePasswordSchema = Yup.InferType<typeof changePasswordSchema>;
