import reducer, {
  clearOrder,
  createOrder,
  getOrderByNumber
} from './order-slice';

describe('order reducer', () => {
  const initialState = {
    orderModalData: null,
    orderRequest: false,
    orders: [],
    error: null
  };

  const mockOrder = {
    _id: '1',
    status: 'done',
    name: 'Test order',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
    number: 123,
    ingredients: ['1', '2']
  } as any;

  it('should return initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle createOrder.pending', () => {
    const state = reducer(initialState, {
      type: createOrder.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      error: null
    });
  });

  it('should handle createOrder.fulfilled', () => {
    const state = reducer(
      { ...initialState, orderRequest: true },
      {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      }
    );

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderModalData: mockOrder
    });
  });

  it('should handle createOrder.rejected', () => {
    const state = reducer(
      { ...initialState, orderRequest: true },
      {
        type: createOrder.rejected.type,
        payload: 'Ошибка создания заказа'
      }
    );

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      error: 'Ошибка создания заказа'
    });
  });

  it('should handle getOrderByNumber.pending', () => {
    const state = reducer(initialState, {
      type: getOrderByNumber.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      orderRequest: true,
      error: null
    });
  });

  it('should handle getOrderByNumber.fulfilled', () => {
    const state = reducer(
      { ...initialState, orderRequest: true },
      {
        type: getOrderByNumber.fulfilled.type,
        payload: mockOrder
      }
    );

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      orderModalData: mockOrder
    });
  });

  it('should handle getOrderByNumber.rejected', () => {
    const state = reducer(
      { ...initialState, orderRequest: true },
      {
        type: getOrderByNumber.rejected.type,
        payload: 'Ошибка получения заказа'
      }
    );

    expect(state).toEqual({
      ...initialState,
      orderRequest: false,
      error: 'Ошибка получения заказа'
    });
  });

  it('should handle clearOrder', () => {
    const prevState = {
      orderModalData: mockOrder,
      orderRequest: true,
      orders: [],
      error: 'Какая-то ошибка'
    };

    const state = reducer(prevState, clearOrder());

    expect(state).toEqual(initialState);
  });
});
