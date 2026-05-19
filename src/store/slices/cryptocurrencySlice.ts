import {
	createSlice,
	createAsyncThunk,
	PayloadAction,
} from '@reduxjs/toolkit';

import {
	getCryptocurrencies,
	getCryptocurrencyDetail,
	getCryptocurrencyHistory,
} from '../../services/coinsService';

import {
	Cryptocurrency,
	CryptocurrencyDetail,
	CryptocurrencyHistory,
} from '../../types';

interface CryptocurrencyState {
	cryptocurrencies: Cryptocurrency[];
	cryptocurrencyDetail: CryptocurrencyDetail | null;
	cryptocurrencyHistory: CryptocurrencyHistory | null;
	timeRange: string;
	favorites: string[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

function loadFavorites(): string[] {
	try {
		const stored = localStorage.getItem('favorites');
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function saveFavorites(favorites: string[]) {
	localStorage.setItem('favorites', JSON.stringify(favorites));
}

const initialState: CryptocurrencyState = {
	cryptocurrencies: [],
	cryptocurrencyDetail: null,
	cryptocurrencyHistory: null,
	timeRange: '30',
	favorites: loadFavorites(),
	status: 'idle',
	error: null,
};

// Async thunk to fetch the list of cryptocurrencies
export const fetchCryptocurrencies = createAsyncThunk(
	'cryptocurrency/fetchCryptocurrencies',
	async () => {
		const response = await getCryptocurrencies();
		return response;
	}
);

// Async thunk to fetch the list of cryptocurrency details
export const fetchCryptocurrencyDetail = createAsyncThunk(
	'cryptocurrency/fetchCryptocurrencyDetail',
	async (id: string) => {
		const response = await getCryptocurrencyDetail(id);
		return response;
	}
);

// Async thunk to fetch the list of cryptocurrency history
export const fetchCryptocurrencyHistory = createAsyncThunk(
	'cryptocurrency/fetchCryptocurrencyHistory',
	async ({ id, timeRange }: { id: string; timeRange: string }) => {
		const response = await getCryptocurrencyHistory(id, timeRange);
		return response;
	}
);

const cryptocurrencySlice = createSlice({
	name: 'cryptocurrency',
	initialState,
	reducers: {
		setTimeRange(state, action: PayloadAction<string>) {
			state.timeRange = action.payload;
		},
		addFavorite: (state, action: PayloadAction<string>) => {
			state.favorites.push(action.payload);
			saveFavorites(state.favorites);
		},
		removeFavorite: (state, action: PayloadAction<string>) => {
			state.favorites = state.favorites.filter(
				(id) => id !== action.payload
			);
			saveFavorites(state.favorites);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCryptocurrencies.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchCryptocurrencies.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.cryptocurrencies = action.payload;
			})
			.addCase(fetchCryptocurrencies.rejected, (state, action) => {
				state.status = 'failed';
				state.error =
					action.error.message || 'Failed to fetch cryptocurrencies';
			})
			.addCase(fetchCryptocurrencyDetail.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchCryptocurrencyDetail.fulfilled,
				(state, action) => {
					state.status = 'succeeded';
					state.cryptocurrencyDetail = action.payload;
				}
			)
			.addCase(
				fetchCryptocurrencyDetail.rejected,
				(state, action) => {
					state.status = 'failed';
					state.error =
						action.error.message ||
						'Failed to fetch cryptocurrency detail';
				}
			)
			.addCase(fetchCryptocurrencyHistory.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchCryptocurrencyHistory.fulfilled,
				(state, action) => {
					state.status = 'succeeded';
					state.cryptocurrencyHistory = action.payload;
				}
			)
			.addCase(
				fetchCryptocurrencyHistory.rejected,
				(state, action) => {
					state.status = 'failed';
					state.error =
						action.error.message ||
						'Failed to fetch cryptocurrency history';
				}
			);
	},
});

export const { addFavorite, removeFavorite, setTimeRange } =
	cryptocurrencySlice.actions;

export default cryptocurrencySlice.reducer;
