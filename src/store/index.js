import { configureStore } from '@reduxjs/toolkit';
import prices from '../pages/prices-page/slice.js';

const store = configureStore({
	reducer: {
		pricesReducer: prices,
	},
});

export { store };
