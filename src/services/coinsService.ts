import axios from 'axios';

import {
	Cryptocurrency,
	CryptocurrencyDetail,
	CryptocurrencyHistory,
} from '../types';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

function saveDataToLocal(key: string, data: unknown) {
	localStorage.setItem(key, JSON.stringify(data));
}

function getDataFromLocal(key: string) {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : null;
}

export const getCryptocurrencies = async (): Promise<
	Cryptocurrency[]
> => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/coins/markets`,
			{
				params: { vs_currency: 'usd' },
			}
		);
		saveDataToLocal('cryptocurrencies', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching cryptocurrencies:', error);
		const localData = getDataFromLocal('cryptocurrencies');
		if (localData) {
			return localData;
		}
		return [];
	}
};

export const getCryptocurrencyDetail = async (
	id: string
): Promise<CryptocurrencyDetail | void> => {
	try {
		const response = await axios.get(`${API_BASE_URL}/coins/${id}`);
		saveDataToLocal(`${id}_detail`, response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching cryptocurrency detail:', error);
		const localData = getDataFromLocal(`${id}_detail`);
		if (localData) {
			return localData;
		}
	}
};

export const getCryptocurrencyHistory = async (
	id: string,
	days: string
): Promise<CryptocurrencyHistory | void> => {
	try {
		const response = await axios.get(
			`${API_BASE_URL}/coins/${id}/market_chart`,
			{
				params: {
					vs_currency: 'usd',
					days: days,
				},
			}
		);
		saveDataToLocal(`${id}_history_${days}`, response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching cryptocurrency history:', error);
		const localData = getDataFromLocal(`${id}_history_${days}`);
		if (localData) {
			return localData;
		}
	}
};
