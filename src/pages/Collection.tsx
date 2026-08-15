import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
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

	const favoriteCryptocurrencies = useMemo(
		() =>
			favorites
				.map((favorite: string) =>
					cryptocurrencies.find(
						(crypto: Cryptocurrency) => crypto.id === favorite
					)
				)
				.filter(
					(crypto: Cryptocurrency | undefined): crypto is Cryptocurrency =>
						crypto !== undefined
				),
		[favorites, cryptocurrencies]
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
			{favoriteCryptocurrencies.length === 0 && (
				<div className="flex flex-col items-center gap-3 pt-16 text-slate-500">
					<StarIcon className="size-12 text-slate-300" />
					<p className="font-medium text-slate-700">No favorites yet</p>
					<p className="text-sm">Star a coin on its detail page to add it here.</p>
					<Link to="/" className="text-sm text-blue-500 hover:underline">Browse coins →</Link>
				</div>
			)}
		</div>
	);
};

export default Collection;
