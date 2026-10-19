import { initialState } from './slice.js';
import { createSelector } from '@reduxjs/toolkit';

export const getBrandsSearchSelector = () => state => state.pricesReducer?.brandsSearch ?? initialState.brandsSearch;

export const getBrandsSelector = () => state => state.pricesReducer?.brands ?? initialState.brands;

export const getChosenBrandSelector = () => state => state.pricesReducer?.chosenBrand ?? initialState.chosenBrand;

export const getIsBrandsLoadingSelector = () => state =>
	state.pricesReducer?.isBrandsLoading ?? initialState.isBrandsLoading;

export const getBrandsErrorSelector = () => state => state.pricesReducer?.brandsError ?? initialState.brandsError;

export const getAnaloguesSelector = () => state => state.pricesReducer?.analogues ?? initialState.analogues;

export const getIsAnaloguesLoadingSelector = () => state =>
	state.pricesReducer?.isAnaloguesLoading ?? initialState.isAnaloguesLoading;

export const getAnaloguesErrorSelector = () => state =>
	state.pricesReducer?.analoguesError ?? initialState.analoguesError;

export const getSearchedNumberSelector = () => state =>
	state.pricesReducer?.searchedNumber ?? initialState.searchedNumber;

export const getBrandsOptionsSelector = () =>
	createSelector(getBrandsSelector(), brands => {
		const unique = new Set();

		return brands.reduce((acc, item) => {
			if (!unique.has(item.brand) && item.brand && item.goodsID) {
				acc.push({
					value: item.brand,
					label: item.brand,
					key: item.goodsID,
				});
			}
			unique.add(item.brand);
			return acc;
		}, []);
	});

export const getAnaloguesTableSelector = () =>
	createSelector(getAnaloguesSelector(), analogues => {
		return analogues.reduce((acc, analogue) => {
			if (analogue.goodsID && analogue?.name) {
				acc.push({
					id: analogue.goodsID,
					name: analogue?.name || '-',
					count: analogue?.count || 0,
					price: analogue?.price || 0,
				});
			}

			return acc;
		}, []);
	});
