import { createAsyncThunk } from '@reduxjs/toolkit';
import { makeRequest } from '../../api';
import { buildQueryParams } from './utils.js';
import { getSearchedNumberSelector } from './selectors.js';

export const getBrandsThunk = createAsyncThunk('brands/fetchBrands', async (number, { rejectWithValue, signal }) => {
	try {
		const data = await makeRequest({
			query: buildQueryParams({ number }),
			signal,
		});

		if (data.error) {
			return rejectWithValue(data?.error || 'Произошла ошибка');
		}

		return data.goods;
	} catch (e) {
		if (e.name === 'AbortError') throw e;
		return rejectWithValue('Ошибка соединения, попробуйте ещё раз');
	}
});

export const getAnalogsThunk = createAsyncThunk(
	'analogs/fetchAnalogs',
	async (brand, { getState, rejectWithValue, signal }) => {
		if (!brand) return;

		const state = getState();

		const selectBrandsSearch = getSearchedNumberSelector();

		const number = selectBrandsSearch(state);

		try {
			const data = await makeRequest({
				query: buildQueryParams({ brand: brand.value, number, analogues: 'on' }),
				signal,
			});

			if (data.error) {
				return rejectWithValue(data.error || 'Произошла ошибка');
			}

			return data.goods;
		} catch (e) {
			if (signal.aborted) throw e;
			return rejectWithValue('Ошибка соединения, попробуйте ещё раз');
		}
	},
	{
		condition: brand => Boolean(brand),
	},
);
