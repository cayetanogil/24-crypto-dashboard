import {
	CryptocurrencyHistory,
	SanitizedCryptocurrencyHistory,
} from '../types';

export const transformChartData = (
	data: CryptocurrencyHistory
): SanitizedCryptocurrencyHistory[] => {
	return data.prices.map((priceEntry, index) => {
		const [timestamp, price] = priceEntry;
		const volume = data.total_volumes[index][1];
		const marketCap = data.market_caps[index][1];

		const date = new Date(timestamp).toISOString();

		return {
			date,
			price,
			volume,
			marketCap,
		};
	});
};
