import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import type { Store } from 'redux';
import cryptocurrencyReducer from './slices/cryptocurrencySlice';

const store: Store = configureStore({
	reducer: {
		cryptocurrency: cryptocurrencyReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
