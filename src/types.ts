export type TimeRange = '7' | '30' | '365';

export type Cryptocurrency = {
	id: string;
	name: string;
	symbol: string;
	current_price: number;
	price_change_percentage_24h: number | null;
	image: string;
	last_updated: string;
};

export type CryptocurrencyDetail = {
	id: string;
	symbol: string;
	name: string;
	description: {
		en: string;
	};
	links: {
		homepage: string[];
		repos_url: {
			github: string[];
		};
		subreddit_url: string;
		whitepaper: string;
	};
	image: {
		thumb: string;
		small: string;
		large: string;
	};
	market_data: {
		current_price: { usd: number };
		total_volume: { usd: number };
		market_cap: { usd: number };
		price_change_percentage_24h: number | null;
		circulating_supply: number;
		total_supply: number | null;
		max_supply: number | null;
		last_updated: string;
	};
	last_updated: string;
};

export type CryptocurrencyHistory = {
	market_caps: [number, number][];
	prices: [number, number][];
	total_volumes: [number, number][];
};

export interface SanitizedCryptocurrencyHistory {
	date: string;
	price: number;
	volume: number;
	marketCap: number;
}
