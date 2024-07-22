import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCryptocurrencies } from '../store/slices/cryptocurrencySlice';
import { RootState, useAppDispatch } from '../store';

const useCryptocurrencies = () => {
	const dispatch = useAppDispatch();
	const cryptocurrencies = useSelector(
		(state: RootState) => state.cryptocurrency.cryptocurrencies
	);
	const status = useSelector(
		(state: RootState) => state.cryptocurrency.status
	);
	const error = useSelector(
		(state: RootState) => state.cryptocurrency.error
	);

	useEffect(() => {
		dispatch(fetchCryptocurrencies());
	}, [dispatch]);

	return { cryptocurrencies, status, error };
};

export default useCryptocurrencies;
