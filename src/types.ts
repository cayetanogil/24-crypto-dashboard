export type Cryptocurrency = {
	id: string;
	name: string;
	symbol: string;
	current_price: number;
	price_change_percentage_24h: number;
	image: string;
};

export type CryptocurrencyDetail = {
	id: string;
	symbol: string;
	name: string;
	description: Record<string, unknown>;
	links: Record<string, unknown>;
	image: Record<string, unknown>;
	market_data: Record<string, unknown>;
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
