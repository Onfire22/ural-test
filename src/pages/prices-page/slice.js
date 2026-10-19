import { createSlice } from '@reduxjs/toolkit';
import { getAnalogsThunk, getBrandsThunk } from './thunks.js';

export const initialState = {
	brandsSearch: '',
	brands: [],
	isBrandsLoading: false,
	brandsError: '',
	chosenBrand: null,
	analogues: [],
	isAnaloguesLoading: false,
	analoguesError: '',
	searchedNumber: '',
};

const pricesSlice = createSlice({
	name: 'prices',
	initialState,
	reducers: {
		setChosenBrand: (state, action) => {
			state.chosenBrand = action.payload;
		},
		setBrandsSearch: (state, action) => {
			state.brandsSearch = action.payload;
		},
		clearBrands: state => {
			state.brands = [];
			state.brandsError = '';
			state.isBrandsLoading = false;
			state.chosenBrand = null;
			state.analogues = [];
			state.searchedNumber = '';
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getBrandsThunk.pending, (state, action) => {
				state.isBrandsLoading = true;
				state.brandsError = '';
				state.searchedNumber = action.meta.arg;
			})
			.addCase(getBrandsThunk.fulfilled, (state, action) => {
				state.isBrandsLoading = false;
				state.brands = action.payload;
			})
			.addCase(getBrandsThunk.rejected, (state, action) => {
				state.isBrandsLoading = false;
				if (action.meta.aborted) return;

				state.brandsError = action.payload;
			})
			.addCase(getAnalogsThunk.pending, state => {
				state.isAnaloguesLoading = true;
				state.analoguesError = '';
			})
			.addCase(getAnalogsThunk.fulfilled, (state, action) => {
				state.isAnaloguesLoading = false;
				state.analogues = action.payload;
			})
			.addCase(getAnalogsThunk.rejected, (state, action) => {
				state.isAnaloguesLoading = false;
				if (action.meta.aborted) return;

				state.analoguesError = action.payload;
			});
	},
});

export const { setBrandsSearch, setChosenBrand, clearBrands } = pricesSlice.actions;

export default pricesSlice.reducer;
