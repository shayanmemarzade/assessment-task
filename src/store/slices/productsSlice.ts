import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import initialState from '../../products.json';

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState as Product[],
  reducers: {
    addComment: (state, action: PayloadAction<{ productId: number, date: string, comment: string, rate: number }>) => {
      const { productId, date, comment, rate } = action.payload;
      const product = state.find(p => p.id === productId);

      if (product) {
        product.comments.push({ date, comment, rate });
      }
    }
  }
});

export const { addComment } = productsSlice.actions;

export default productsSlice.reducer;
