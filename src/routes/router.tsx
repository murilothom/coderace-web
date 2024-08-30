import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from '../pages/_layouts/app';
import { PublicLayout } from '../pages/_layouts/public';
// import { Logout } from '../pages/app/logout';
// import { ResetPassword } from '../pages/app/reset-password';
// import { UserData } from '../pages/app/user-data';
// import { ChangePasswordWithEmailAndCode } from '../pages/auth/change-password-with-email-and-code';
// import { RecoverPasswordByEmail } from '../pages/auth/recover-password-by-email';
// import { SignIn } from '../pages/auth/sign-in';
// import { SignUp } from '../pages/auth/sign-up';
import { Error } from '../pages/public/error';
import { NotFound } from '../pages/public/not-found';
import { ProtectedRoute } from './protected-route';
import { PublicRoute } from './public-route';
// import { TermsOfUse } from '../pages/auth/terms-of-use';
// import { PrivacyPolicy } from '../pages/auth/privacy-policy';
// import { UserProvider } from '../shared/contexts/user-context';

export const Router = () => {
  return (
    <BrowserRouter>
      {/* <UserProvider> */}
        <Routes>
          <Route
            element={
              <PublicRoute>
                <PublicLayout />
              </PublicRoute>
            }
          >
            <Route path="/" element={<div />} />
            {/* <Route path="/entrar" element={<SignIn />} /> */}
            {/* <Route path="/cadastrar" element={<SignUp />} /> */}
            {/* <Route path="/recuperar-senha" element={<RecoverPasswordByEmail />} /> */}
            {/* <Route path="/recuperar-senha/:code/:email" element={<ChangePasswordWithEmailAndCode />} /> */}
          </Route>

          <Route element={<PublicLayout />}>
            {/* <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} /> */}
            {/* <Route path="/termos-de-uso" element={<TermsOfUse />} /> */}
          </Route>

          <Route
            element={
              <ProtectedRoute shouldBeAuthenticated>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            {/* //* PÁGINA INICIAL */}
            <Route index element={<div />} />
            {/* <Route path="/perfil" element={<div />} /> */}
            {/* <Route path="/meus-dados" element={<UserData />} /> */}
            {/* <Route path="/meus-dados/redefinir-senha" element={<ResetPassword />} /> */}
            {/* <Route path="/sair" element={<Logout />} /> */}
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/erro" element={<Error />} />
        </Routes>
      {/* </UserProvider> */}
    </BrowserRouter>
  );
};