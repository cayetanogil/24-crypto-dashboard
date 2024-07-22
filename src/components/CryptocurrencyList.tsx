import { NavLink } from 'react-router-dom';
import CryptocurrencyCard from './CryptocurrencyCard';
import { Cryptocurrency } from '../types';

interface CryptocurrencyProps {
	cryptocurrencies: Cryptocurrency[];
	isGrid: boolean;
	limit?: number;
}

function CryptocurrencyList({
	cryptocurrencies,
	isGrid,
	limit,
}: CryptocurrencyProps) {
	return (
		<nav
			className={`${
				isGrid
					? 'grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4'
					: 'mb-2 text-sm'
			}`}
		>
			{isGrid ? (
				cryptocurrencies.slice(0, limit).map((crypto) => (
					<div key={crypto.id}>
						<NavLink
							className="w-full block"
							to={`/coins/${crypto.id}`}
						>
							<CryptocurrencyCard data={crypto} />
						</NavLink>
					</div>
				))
			) : (
				<ul>
					{cryptocurrencies.slice(0, limit).map((crypto) => (
						<li
							key={crypto.id}
							className="mb-2 rounded py-1 px-2 text-slate-600 hover:text-slate-800 hover:bg-white transition-all"
						>
							<NavLink
								to={`/coins/${crypto.id}`}
								className="w-full block"
							>
								{crypto.name}
							</NavLink>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
}

export default CryptocurrencyList;
