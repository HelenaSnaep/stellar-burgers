import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  orderModalData: TOrder | null;
  orderRequest: boolean;
}

const initialState: OrderState = {
  orderModalData: null,
  orderRequest: false
};

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
      });
  }
});

export const fetchNewOrder = createAsyncThunk(
  'order/fetchNewOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
