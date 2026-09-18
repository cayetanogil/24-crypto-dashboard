import numeral from 'numeral';
import { useSelector } from 'react-redux';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarIcon } from '@heroicons/react/24/solid';

import { RootState } from '@/store';
import { Cryptocurrency } from '../types';

interface CryptocurrencyProps {
	data: Cryptocurrency;
}

function CryptocurrencyCard({ data: crypto }: CryptocurrencyProps) {
	const isFavorite = useSelector((state: RootState) =>
		state.cryptocurrency.favorites.includes(crypto.id)
	);

	return (
		<Card className="relative bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all">
			<CardHeader className="relative p-4 flex flex-row items-center gap-3">
				<img
					className="w-10 h-10 mt-2"
					src={crypto.image}
					alt={crypto.name}
					loading="lazy"
				/>
				<div className="overflow-hidden truncate">
					<CardTitle className="text-slate-700 truncate text-xl font-medium">
						{crypto.name}
					</CardTitle>
					<CardDescription className="uppercase tracking-wide text-sm">
						{crypto.symbol}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-0">
				<div className="text-2xl text-slate-700 text-left">
					<span className="block font-bold">
						${numeral(crypto.current_price).format('0,0.00')}
					</span>
					<Badge
						className={`text-xs font-semibold ${
							crypto.price_change_percentage_24h == null
								? 'bg-slate-200 hover:bg-slate-200 text-slate-600'
								: crypto.price_change_percentage_24h >= 0
									? 'bg-green-200 hover:bg-green-200 text-green-800'
									: 'bg-red-200 hover:bg-red-200 text-red-800'
						}`}
					>
						{crypto.price_change_percentage_24h != null
							? `${crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'} ${Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%`
							: 'N/A'}
					</Badge>
				</div>
			</CardContent>
			{isFavorite && (
				<StarIcon className="absolute bottom-3 right-3 size-5 text-amber-400" />
			)}
		</Card>
	);
}

export default CryptocurrencyCard;
