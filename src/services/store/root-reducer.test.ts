import { rootReducer } from './root-reducer';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      },
      order: {
        orderModalData: null,
        orderRequest: false,
        orders: [],
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      }
    });
  });
});
