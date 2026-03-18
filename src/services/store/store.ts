// import { configureStore } from '@reduxjs/toolkit';
// import { store } from './store/store';
// import ingredientsReducer from './slices/ingredients-slice/ingredients-slice';
// import feedReducer from './slices/feed-slice/feed-slice';
// import orderReducer from './slices/order-slice/order-slice';
// import burgerConstructorReducer from './slices/burger-constructor-slice/burger-constructor-slice';
// import userReducer from './slices/user/user-slice';
//
// import {
//   TypedUseSelectorHook,
//   useDispatch as dispatchHook,
//   useSelector as selectorHook
// } from 'react-redux';
//
// export const store = configureStore({
//   reducer: {
//     ingredients: ingredientsReducer,
//     feed: feedReducer,
//     order: orderReducer,
//     burgerConstructor: burgerConstructorReducer,
//     user: userReducer
//   },
//   devTools: process.env.NODE_ENV !== 'production'
// });
//
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
//
// export const useDispatch = () => dispatchHook<AppDispatch>();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
//
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, type RootState } from './root-reducer';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
