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

const initialState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

const mockUser = {
  email: 'test@test.com',
  name: 'Test User'
} as any;

describe('userSlice reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle registerUser.pending', () => {
    const state = reducer(initialState, {
      type: registerUser.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle registerUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: mockUser,
      isAuthChecked: true
    });
  });

  it('should handle registerUser.rejected', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: registerUser.rejected.type,
        payload: 'Ошибка при регистрации'
      }
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка при регистрации'
    });
  });

  it('should handle loginUser.pending', () => {
    const state = reducer(initialState, {
      type: loginUser.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle loginUser.fulfilled', () => {
    const state = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockUser
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: mockUser,
      isAuthChecked: true
    });
  });

  it('should handle loginUser.rejected', () => {
    const state = reducer(
      { ...initialState, isLoading: true, user: mockUser },
      {
        type: loginUser.rejected.type,
        payload: 'Ошибка при входе'
      }
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: null,
      isAuthChecked: true,
      error: 'Ошибка при входе'
    });
  });

  it('should handle checkUserAuth.pending', () => {
    const state = reducer(initialState, {
      type: checkUserAuth.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle checkUserAuth.fulfilled', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      }
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: mockUser,
      isAuthChecked: true
    });
  });

  it('should handle checkUserAuth.rejected', () => {
    const state = reducer(
      { ...initialState, isLoading: true, user: mockUser },
      {
        type: checkUserAuth.rejected.type
      }
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      user: null,
      isAuthChecked: true
    });
  });

  it('should handle updateUser.fulfilled', () => {
    const updatedUser = {
      email: 'test@test.com',
      name: 'Updated User'
    } as any;

    const state = reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: updatedUser
    });

    expect(state.user).toEqual(updatedUser);
  });

  it('should handle logoutUser.fulfilled', () => {
    const state = reducer(
      { ...initialState, user: mockUser },
      {
        type: logoutUser.fulfilled.type
      }
    );

    expect(state).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true
    });
  });

  it('should handle forgotPassword.rejected', () => {
    const state = reducer(initialState, {
      type: forgotPassword.rejected.type,
      payload: 'Ошибка восстановления пароля'
    });

    expect(state.error).toBe('Ошибка восстановления пароля');
  });

  it('should handle resetPassword.rejected', () => {
    const state = reducer(initialState, {
      type: resetPassword.rejected.type,
      payload: 'Ошибка сброса пароля'
    });

    expect(state.error).toBe('Ошибка сброса пароля');
  });
});
