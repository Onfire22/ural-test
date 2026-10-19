import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearBrands, setBrandsSearch } from '../../slice.js';
import { getBrandsErrorSelector, getBrandsSearchSelector } from '../../selectors.js';
import { CustomInput } from '../../../../ui/input/index.jsx';

const PartNumberField = () => {
	const dispatch = useDispatch();

	const inputId = useId();

	const brandsSearch = useSelector(getBrandsSearchSelector());

	const brandsError = useSelector(getBrandsErrorSelector());

	const handleChange = e => {
		dispatch(setBrandsSearch(e.target.value));
	};

	const handleClear = () => {
		dispatch(setBrandsSearch(''));
		dispatch(clearBrands());
	};

	return (
		<CustomInput
			id={inputId}
			error={brandsError}
			onChange={handleChange}
			value={brandsSearch}
			handleClear={handleClear}
			label="Артикул запчасти"
			placeholder="Введите артикул, например, 1234"
		/>
	);
};

export { PartNumberField };
