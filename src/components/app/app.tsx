import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  ConstructorPage,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Feed } from '@pages';
import { NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

const App = () => (
  <BrowserRouter>
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
