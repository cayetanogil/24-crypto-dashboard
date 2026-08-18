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
	TimeRange,
} from '../../types';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface CryptocurrencyState {
	cryptocurrencies: Cryptocurrency[];
	cryptocurrencyDetail: CryptocurrencyDetail | null;
	cryptocurrencyHistory: CryptocurrencyHistory | null;
	timeRange: TimeRange;
	favorites: string[];
	listStatus: Status;
	detailStatus: Status;
	historyStatus: Status;
	listError: string | null;
	detailError: string | null;
	historyError: string | null;
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
	listStatus: 'idle',
	detailStatus: 'idle',
	historyStatus: 'idle',
	listError: null,
	detailError: null,
	historyError: null,
};

export const fetchCryptocurrencies = createAsyncThunk(
	'cryptocurrency/fetchCryptocurrencies',
	async (_: void, { signal }) => {
		const response = await getCryptocurrencies(signal);
		return response;
	}
);

export const fetchCryptocurrencyDetail = createAsyncThunk(
	'cryptocurrency/fetchCryptocurrencyDetail',
	async (id: string, { signal }) => {
		const response = await getCryptocurrencyDetail(id, signal);
		return response;
	}
);

export const fetchCryptocurrencyHistory = createAsyncThunk(
	'cryptocurrency/fetchCryptocurrencyHistory',
	async (
		{ id, timeRange }: { id: string; timeRange: TimeRange },
		{ signal }
	) => {
		const response = await getCryptocurrencyHistory(id, timeRange, signal);
		return response;
	}
);

const cryptocurrencySlice = createSlice({
	name: 'cryptocurrency',
	initialState,
	reducers: {
		setTimeRange(state, action: PayloadAction<TimeRange>) {
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
				state.listStatus = 'loading';
				state.listError = null;
			})
			.addCase(fetchCryptocurrencies.fulfilled, (state, action) => {
				state.listStatus = 'succeeded';
				state.cryptocurrencies = action.payload;
			})
			.addCase(fetchCryptocurrencies.rejected, (state, action) => {
				if (action.meta.aborted) return;
				state.listStatus = 'failed';
				state.listError =
					action.error.message || 'Failed to fetch cryptocurrencies';
			})
			.addCase(fetchCryptocurrencyDetail.pending, (state) => {
				state.detailStatus = 'loading';
				state.detailError = null;
			})
			.addCase(fetchCryptocurrencyDetail.fulfilled, (state, action) => {
				state.detailStatus = 'succeeded';
				state.cryptocurrencyDetail = action.payload;
			})
			.addCase(fetchCryptocurrencyDetail.rejected, (state, action) => {
				if (action.meta.aborted) return;
				state.detailStatus = 'failed';
				state.detailError =
					action.error.message || 'Failed to fetch cryptocurrency detail';
			})
			.addCase(fetchCryptocurrencyHistory.pending, (state) => {
				state.historyStatus = 'loading';
				state.historyError = null;
			})
			.addCase(fetchCryptocurrencyHistory.fulfilled, (state, action) => {
				state.historyStatus = 'succeeded';
				state.cryptocurrencyHistory = action.payload;
			})
			.addCase(fetchCryptocurrencyHistory.rejected, (state, action) => {
				if (action.meta.aborted) return;
				state.historyStatus = 'failed';
				state.historyError =
					action.error.message || 'Failed to fetch cryptocurrency history';
			});
	},
});

export const { addFavorite, removeFavorite, setTimeRange } =
	cryptocurrencySlice.actions;

export default cryptocurrencySlice.reducer;
