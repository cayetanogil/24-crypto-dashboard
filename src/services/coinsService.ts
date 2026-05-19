import axios from 'axios';

import {
	Cryptocurrency,
	CryptocurrencyDetail,
	CryptocurrencyHistory,
} from '../types';

const API_BASE_URL = import.meta.env.DEV
	? '/api/v3'
	: 'https://api.coingecko.com/api/v3';

const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

function saveToCache<T>(key: string, data: T) {
	localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
}

function getFreshFromCache<T>(key: string): T | null {
	try {
		const stored = localStorage.getItem(key);
		if (!stored) return null;
		const entry: CacheEntry<T> = JSON.parse(stored);
		if (Date.now() - entry.timestamp < CACHE_TTL_MS) return entry.data;
	} catch {}
	return null;
}

function getStaleFromCache<T>(key: string): T | null {
	try {
		const stored = localStorage.getItem(key);
		if (!stored) return null;
		const entry: CacheEntry<T> = JSON.parse(stored);
		return entry.data;
	} catch {}
	return null;
}

export const getCryptocurrencies = async (): Promise<Cryptocurrency[]> => {
	const cached = getFreshFromCache<Cryptocurrency[]>('cryptocurrencies');
	if (cached) return cached;

	try {
		const response = await axios.get(`${API_BASE_URL}/coins/markets`, {
			params: { vs_currency: 'usd' },
		});
		saveToCache('cryptocurrencies', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching cryptocurrencies:', error);
		return getStaleFromCache<Cryptocurrency[]>('cryptocurrencies') ?? [];
	}
};

export const getCryptocurrencyDetail = async (
	id: string
): Promise<CryptocurrencyDetail | void> => {
	const cacheKey = `${id}_detail`;
	const cached = getFreshFromCache<CryptocurrencyDetail>(cacheKey);
	if (cached) return cached;

	try {
		const response = await axios.get(`${API_BASE_URL}/coins/${id}`);
		saveToCache(cacheKey, response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching cryptocurrency detail:', error);
		return getStaleFromCache<CryptocurrencyDetail>(cacheKey) ?? undefined;
	}
};

export const getCryptocurrencyHistory = async (
	id: string,
	days: string
): Promise<CryptocurrencyHistory | void> => {
	const cacheKey = `${id}_history_${days}`;
	const cached = getFreshFromCache<CryptocurrencyHistory>(cacheKey);
	if (cached) return cached;

	try {
		const response = await axios.get(`${API_BASE_URL}/coins/${id}/market_chart`, {
			params: { vs_currency: 'usd', days },
		});
		saveToCache(cacheKey, response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching cryptocurrency history:', error);
		return getStaleFromCache<CryptocurrencyHistory>(cacheKey) ?? undefined;
	}
};
