import MainPage from '../../pages/main/main';
import NotFoundPage from '../../pages/not-found/not-found';
import LoginPage from '../../pages/login/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

export default function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
