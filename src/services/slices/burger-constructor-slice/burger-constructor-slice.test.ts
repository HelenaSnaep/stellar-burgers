import reducer, {
  addIngredient,
  removeIngredient,
  initialState
} from './burger-constructor-slice';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

describe('burgerConstructor reducer', () => {
  const bun = {
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
  };

  const sauce = {
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
  };

  it('should add bun', () => {
    const state = reducer(initialState, addIngredient(bun));

    expect(state).toEqual({
      bun: {
        ...bun,
        id: 'test-uuid'
      },
      ingredients: []
    });
  });

  it('should add ingredient', () => {
    const state = reducer(initialState, addIngredient(sauce));

    expect(state).toEqual({
      bun: null,
      ingredients: [
        {
          ...sauce,
          id: 'test-uuid'
        }
      ]
    });
  });

  it('should remove ingredient', () => {
    const prevState = {
      ...initialState,
      ingredients: [
        {
          ...sauce,
          id: 'test-uuid'
        },
        {
          ...sauce,
          _id: '3',
          name: 'Начинка',
          id: 'another-id'
        }
      ]
    };

    const state = reducer(prevState, removeIngredient('test-uuid'));

    expect(state).toEqual({
      ...initialState,
      ingredients: [
        {
          ...sauce,
          _id: '3',
          name: 'Начинка',
          id: 'another-id'
        }
      ]
    });
  });
});
