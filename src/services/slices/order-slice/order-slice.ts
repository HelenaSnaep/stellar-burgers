import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  orderModalData: TOrder | null;
  orderRequest: boolean;

  orders: TOrder[];
}

const initialState: OrderState = {
  orderModalData: null,
  orderRequest: false,
  orders: []
};

export const fetchNewOrder = createAsyncThunk(
  'order/fetchNewOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0]; // API возвращает массив, берем первый элемент
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })

      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
