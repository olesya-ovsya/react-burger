import HomePage from '../../pages/home/home';
import NotFoundPage from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login';
import RegisterPage from '../../pages/register/register';
import ForgotPasswordPage from '../../pages/forgot-password/forgot-password';
import ResetPasswordPage from '../../pages/reset-password/reset-password';
import ProfilePage from '../../pages/profile/profile';
import UserData from '../user-data/user-data';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

export default function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<ProtectedRouteElement element={<LoginPage />} />} />
          <Route path='/register' element={<ProtectedRouteElement element={<RegisterPage />} />} />
          <Route path='/forgot-password' element={<ProtectedRouteElement element={<ForgotPasswordPage />} />} />
          <Route path='/reset-password' element={<ProtectedRouteElement element={<ResetPasswordPage />} />} />
          <Route path='/profile' element={<ProtectedRouteElement element={<ProfilePage />}/>}>
            <Route index element={<ProtectedRouteElement element={<UserData />}/>} />
            <Route path='orders' element={<ProtectedRouteElement element={<NotFoundPage />} />} />
            <Route path='orders/:number' element={<ProtectedRouteElement element={<NotFoundPage />}/>} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
    </div>
  );
}
