import { configureStore } from '@reduxjs/toolkit';
import reducer from './user-slice';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  checkUserAuth,
  updateUser,
  logoutUser
} from './user-thunks';

import {
  registerUserApi,
  loginUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

import { setCookie } from '../../../utils/cookie';

jest.mock('@api', () => ({
  registerUserApi: jest.fn(),
  loginUserApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
  resetPasswordApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn()
}));

jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn()
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      user: reducer
    }
  });

describe('user thunks', () => {
  const mockUser = {
    email: 'test@test.com',
    name: 'Test User'
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('registerUser fulfilled', async () => {
    (registerUserApi as jest.Mock).mockResolvedValue({
      user: mockUser,
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    });

    const store = createTestStore();

    await store.dispatch(
      registerUser({
        email: 'test@test.com',
        password: '123456',
        name: 'Test User'
      })
    );

    expect(registerUserApi).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
      name: 'Test User'
    });
    expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'access-token');
    expect(store.getState().user.user).toEqual(mockUser);
    expect(store.getState().user.isAuthChecked).toBe(true);
    expect(store.getState().user.isLoading).toBe(false);
  });

  it('registerUser rejected', async () => {
    (registerUserApi as jest.Mock).mockRejectedValue(new Error('error'));

    const store = createTestStore();

    await store.dispatch(
      registerUser({
        email: 'test@test.com',
        password: '123456',
        name: 'Test User'
      })
    );

    expect(store.getState().user.error).toBe('Ошибка при регистрации');
    expect(store.getState().user.isLoading).toBe(false);
  });

  it('loginUser fulfilled', async () => {
    (loginUserApi as jest.Mock).mockResolvedValue({
      user: mockUser,
      accessToken: 'access-token',
      refreshToken: 'refresh-token'
    });

    const store = createTestStore();

    await store.dispatch(
      loginUser({
        email: 'test@test.com',
        password: '123456'
      })
    );

    expect(loginUserApi).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456'
    });
    expect(localStorage.getItem('refreshToken')).toBe('refresh-token');
    expect(setCookie).toHaveBeenCalledWith('accessToken', 'access-token');
    expect(store.getState().user.user).toEqual(mockUser);
    expect(store.getState().user.isAuthChecked).toBe(true);
  });

  it('loginUser rejected', async () => {
    (loginUserApi as jest.Mock).mockRejectedValue(new Error('error'));

    const store = createTestStore();

    await store.dispatch(
      loginUser({
        email: 'test@test.com',
        password: '123456'
      })
    );

    expect(store.getState().user.user).toBeNull();
    expect(store.getState().user.isAuthChecked).toBe(true);
    expect(store.getState().user.error).toBe('Ошибка при входе');
  });

  it('checkUserAuth fulfilled', async () => {
    (getUserApi as jest.Mock).mockResolvedValue({
      user: mockUser
    });

    const store = createTestStore();

    await store.dispatch(checkUserAuth());

    expect(getUserApi).toHaveBeenCalled();
    expect(store.getState().user.user).toEqual(mockUser);
    expect(store.getState().user.isAuthChecked).toBe(true);
    expect(store.getState().user.isLoading).toBe(false);
  });

  it('checkUserAuth rejected', async () => {
    (getUserApi as jest.Mock).mockRejectedValue(new Error('error'));

    const store = createTestStore();

    await store.dispatch(checkUserAuth());

    expect(store.getState().user.user).toBeNull();
    expect(store.getState().user.isAuthChecked).toBe(true);
    expect(store.getState().user.isLoading).toBe(false);
  });

  it('updateUser fulfilled', async () => {
    const updatedUser = {
      email: 'test@test.com',
      name: 'Updated User'
    } as any;

    (updateUserApi as jest.Mock).mockResolvedValue({
      user: updatedUser
    });

    const store = createTestStore();

    await store.dispatch(updateUser({ name: 'Updated User' }));

    expect(updateUserApi).toHaveBeenCalledWith({ name: 'Updated User' });
    expect(store.getState().user.user).toEqual(updatedUser);
  });

  it('forgotPassword rejected', async () => {
    (forgotPasswordApi as jest.Mock).mockRejectedValue(new Error('error'));

    const store = createTestStore();

    await store.dispatch(
      forgotPassword({
        email: 'test@test.com'
      })
    );

    expect(store.getState().user.error).toBe('Ошибка восстановления пароля');
  });

  it('resetPassword rejected', async () => {
    (resetPasswordApi as jest.Mock).mockRejectedValue(new Error('error'));

    const store = createTestStore();

    await store.dispatch(
      resetPassword({
        password: '123456',
        token: 'token'
      })
    );

    expect(store.getState().user.error).toBe('Ошибка сброса пароля');
  });

  it('logoutUser fulfilled', async () => {
    (logoutApi as jest.Mock).mockResolvedValue({});

    localStorage.setItem('refreshToken', 'refresh-token');

    const store = createTestStore();

    store.dispatch({
      type: checkUserAuth.fulfilled.type,
      payload: mockUser
    });

    await store.dispatch(logoutUser());

    expect(logoutApi).toHaveBeenCalled();
    expect(localStorage.getItem('refreshToken')).toBeNull();
    expect(store.getState().user.user).toBeNull();
    expect(store.getState().user.isAuthChecked).toBe(true);
  });
});
