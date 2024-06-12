import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store;
