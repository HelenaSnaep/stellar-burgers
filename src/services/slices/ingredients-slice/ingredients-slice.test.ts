import reducer, { fetchIngredients, initialState } from './ingredients-slice';

describe('ingredients reducer', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 40,
      price: 100,
      image: 'bun.png',
      image_mobile: 'bun-mobile.png',
      image_large: 'bun-large.png'
    },
    {
      _id: '2',
      name: 'Соус',
      type: 'sauce',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 50,
      image: 'sauce.png',
      image_mobile: 'sauce-mobile.png',
      image_large: 'sauce-large.png'
    }
  ];

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const state = reducer(initialState, {
      type: fetchIngredients.pending.type
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      }
    );

    expect(state).toEqual({
      ...initialState,
      ingredients: mockIngredients,
      isLoading: false,
      error: null
    });
  });

  it('should handle fetchIngredients.rejected', () => {
    const state = reducer(
      { ...initialState, isLoading: true },
      {
        type: fetchIngredients.rejected.type,
        payload: 'Failed to load ingredients'
      }
    );

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Failed to load ingredients'
    });
  });
});
