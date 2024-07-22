import numeral from 'numeral';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { Cryptocurrency } from '../types';

interface CryptocurrencyProps {
	data: Cryptocurrency;
}

function CryptocurrencyCard({ data: crypto }: CryptocurrencyProps) {
	return (
		<Card className="bg-slate-100 hover:scale-105 hover:bg-white transition-all">
			<CardHeader className="relative p-4 flex flex-row items-center gap-3">
				<img
					className="w-10 h-10 mt-2"
					src={crypto.image}
					alt={crypto.name}
				/>
				<div className="overflow-hidden truncate">
					<CardTitle className="text-slate-700 truncate text-xl">
						{crypto.name}
					</CardTitle>
					<CardDescription className="uppercase text-sm">
						{crypto.symbol}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="p-4 pt-0">
				<div className="text-2xl text-slate-700 text-left">
					<span className="block">
						${numeral(crypto.current_price).format('0,0.00')}
					</span>
					<Badge
						className={`text-xs font-semibold ${
							crypto.price_change_percentage_24h >= 0
								? 'bg-green-200 hover:bg-green-200 text-green-800'
								: 'bg-red-200 hover:bg-red-200 text-red-800'
						}`}
					>
						%{crypto.price_change_percentage_24h.toFixed(2)}
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
}

export default CryptocurrencyCard;
