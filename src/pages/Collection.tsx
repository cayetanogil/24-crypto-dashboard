import { useSelector } from 'react-redux';
import { RootState } from '../store/index';
import CryptocurrencyList from '../components/CryptocurrencyList';
import { Cryptocurrency } from '../types';

const Collection = () => {
	const favorites = useSelector(
		(state: RootState) => state.cryptocurrency.favorites
	);
	const cryptocurrencies = useSelector(
		(state: RootState) => state.cryptocurrency.cryptocurrencies
	);

	const favoriteCryptocurrencies = favorites.map(
		(favorite: string) => {
			return cryptocurrencies.find(
				(crypto: Cryptocurrency) => crypto.id === favorite
			);
		}
	);

	return (
		<div className="p-4 flex-grow">
			{favoriteCryptocurrencies &&
				favoriteCryptocurrencies.length > 0 && (
					<CryptocurrencyList
						cryptocurrencies={favoriteCryptocurrencies}
						isGrid={true}
					/>
				)}
			{favoriteCryptocurrencies &&
				favoriteCryptocurrencies.length === 0 && (
					<p className="text-center text-slate-500">
						No favorite coins added yet.
					</p>
				)}
		</div>
	);
};

export default Collection;
