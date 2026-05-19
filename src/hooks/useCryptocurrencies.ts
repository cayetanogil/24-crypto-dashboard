import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useCryptocurrencies = () => {
	const cryptocurrencies = useSelector(
		(state: RootState) => state.cryptocurrency.cryptocurrencies
	);
	const status = useSelector(
		(state: RootState) => state.cryptocurrency.status
	);
	const error = useSelector(
		(state: RootState) => state.cryptocurrency.error
	);

	return { cryptocurrencies, status, error };
};

export default useCryptocurrencies;
