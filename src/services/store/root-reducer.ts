import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from '../slices/ingredients-slice/ingredients-slice';
import feedReducer from '../slices/feed-slice/feed-slice';
import orderReducer from '../slices/order-slice/order-slice';
import burgerConstructorReducer from '../slices/burger-constructor-slice/burger-constructor-slice';
import userReducer from '../slices/user/user-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feed: feedReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;
