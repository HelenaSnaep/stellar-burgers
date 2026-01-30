import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredients-slice/ingredients-slice';
import feedReducer from './slices/feed-slice/feed-slice';
import orderReducer from './slices/order-slice/order-slice';
import burgerConstructorReducer from './slices/burger-constructor-slice/burger-constructor-slice';

import { TIngredient, TOrder } from '@utils-types';
import { TConstructorIngredient } from './slices/burger-constructor-slice/burger-constructor-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = {
  ingredients: {
    ingredients: TIngredient[];
    isLoading: boolean;
    error: string | null;
  };
  burgerConstructor: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  feed: {
    orders: TOrder[];
    isLoading: boolean;
  };
  order: {
    orderModalData: TOrder | null;
    orderRequest: boolean;
    orders: TOrder[];
  };
};

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
