import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerUser } from '../../services/slices/user/user-thunks';
import { useNavigate, useLocation } from 'react-router-dom';

interface LocationState {
  from?: string;
}

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    try {
      await dispatch(
        registerUser({ name: userName, email, password })
      ).unwrap();

      const from = (location.state as LocationState)?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setErrorText('Ошибка регистрации. Проверьте данные и попробуйте снова.');
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <RegisterUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      userName={userName}
      setUserName={setUserName}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
