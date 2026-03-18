import reducer, {
  fetchFeed,
  fetchUserOrders,
  initialState
} from './feed-slice';

describe('feed reducer', () => {
  const mockOrders = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      number: 101,
      ingredients: ['1', '2']
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Order 2',
      createdAt: '2025-01-02',
      updatedAt: '2025-01-02',
      number: 102,
      ingredients: ['3', '4']
    }
  ] as any;

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchFeed.pending', () => {
    const state = reducer(initialState, {
      type: fetchFeed.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle fetchFeed.fulfilled', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: fetchFeed.fulfilled.type,
        payload: {
          orders: mockOrders,
          total: 500,
          totalToday: 50
        }
      }
    );

    expect(state).toEqual({
      orders: mockOrders,
      total: 500,
      totalToday: 50,
      isLoading: false,
      error: null
    });
  });

  it('should handle fetchFeed.rejected', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: fetchFeed.rejected.type,
        payload: 'Ошибка загрузки ленты заказов'
      }
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки ленты заказов'
    });
  });

  it('should handle fetchUserOrders.pending', () => {
    const state = reducer(initialState, {
      type: fetchUserOrders.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: fetchUserOrders.fulfilled.type,
        payload: mockOrders
      }
    );

    expect(state).toEqual({
      ...initialState,
      orders: mockOrders,
      isLoading: false
    });
  });

  it('should handle fetchUserOrders.rejected', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: fetchUserOrders.rejected.type,
        payload: 'Ошибка загрузки заказов пользователя'
      }
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки заказов пользователя'
    });
  });
});
