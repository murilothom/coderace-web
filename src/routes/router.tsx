import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from '../pages/_layouts/app';
import { PublicLayout } from '../pages/_layouts/public';
import { CreateEmployee } from '../pages/app/create-employee';
import { EmployeeData } from '../pages/app/employee-data';
import { EmployeeProfile } from '../pages/app/employee-profile';
import { Home } from '../pages/app/home';
import { ListEmployees } from '../pages/app/list-employees';
import { ListFeedbacks } from '../pages/app/list-feedbacks';
import { Logout } from '../pages/app/logout';
import { RegisterRecordTime } from '../pages/app/register-record-time';
import { ResetPassword } from '../pages/app/reset-password';
import { UpdateEmployee } from '../pages/app/update-employee';
import { ChangePasswordWithEmailAndCode } from '../pages/public/change-password-with-email-and-code';
import { Error } from '../pages/public/error';
import { NotFound } from '../pages/public/not-found';
import { PrivacyPolicy } from '../pages/public/privacy-policy';
import { RecoverPasswordByEmail } from '../pages/public/recover-password-by-email';
import { SignIn } from '../pages/public/sign-in';
import { SignUp } from '../pages/public/sign-up';
import { TermsOfUse } from '../pages/public/terms-of-use';
import { EmployeeProvider } from '../shared/contexts/employee-context';
import { ProtectedRoute } from './protected-route';
import { PublicRoute } from './public-route';

export const Router = () => {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <Routes>
          <Route
            element={
              <PublicRoute>
                <PublicLayout />
              </PublicRoute>
            }
          >
            <Route path="/" element={<div />} />
            <Route path="/entrar" element={<SignIn />} />
            <Route path="/cadastrar" element={<SignUp />} />
            <Route
              path="/recuperar-senha"
              element={<RecoverPasswordByEmail />}
            />
            <Route
              path="/recuperar-senha/:code/:email"
              element={<ChangePasswordWithEmailAndCode />}
            />
          </Route>

          <Route element={<PublicLayout />}>
            <Route
              path="/politica-de-privacidade"
              element={<PrivacyPolicy />}
            />
            <Route path="/termos-de-uso" element={<TermsOfUse />} />
          </Route>

          <Route
            element={
              <ProtectedRoute shouldBeAuthenticated>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/perfil" element={<EmployeeProfile />} />
            <Route path="/configuracoes" element={<EmployeeData />} />
            <Route path="/feedbacks" element={<ListFeedbacks />} />
            <Route path="/colaboradores" element={<ListEmployees />} />
            <Route path="/colaboradores/novo" element={<CreateEmployee />} />
            <Route path="/colaboradores/:id" element={<UpdateEmployee />} />
            <Route
              path="/configuracoes/redefinir-senha"
              element={<ResetPassword />}
            />
            <Route path="/sair" element={<Logout />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/erro" element={<Error />} />
        </Routes>
      </EmployeeProvider>
    </BrowserRouter>
  );
};
