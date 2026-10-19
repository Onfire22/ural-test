import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearBrands } from '../../slice.js';
import { getBrandsThunk } from '../../thunks.js';
import { getBrandsSearchSelector } from '../../selectors.js';
import { useDebouncedValue } from '../../hooks.js';
import { PartNumberField } from '../part-number-field/index.jsx';
import { BrandsList } from '../brand-list/index.jsx';

const selectBrandsSearch = getBrandsSearchSelector();

const BrandsSearch = () => {
	const dispatch = useDispatch();

	const brandsSearch = useSelector(selectBrandsSearch);

	const debouncedSearch = useDebouncedValue(brandsSearch, 500);

	useEffect(() => {
		const query = debouncedSearch.trim();

		if (!query) {
			dispatch(clearBrands());
			return;
		}

		const request = dispatch(getBrandsThunk(query));
		return () => request.abort();
	}, [debouncedSearch, dispatch]);

	return (
		<div className="d-flex flex-column gap-3">
			<PartNumberField />
			<BrandsList />
		</div>
	);
};

export { BrandsSearch };
