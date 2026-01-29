import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

interface FeedState {
  orders: TOrder[];
  isLoading: boolean;
}

const initialState: FeedState = {
  orders: [],
  isLoading: false
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
  const data = await getFeedsApi();
  return data.orders;
});

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export default feedSlice.reducer;
