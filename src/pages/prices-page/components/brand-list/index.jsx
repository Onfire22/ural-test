import { useDispatch, useSelector } from 'react-redux';
import { setChosenBrand } from '../../slice.js';
import { getAnalogsThunk } from '../../thunks.js';
import {
	getBrandsErrorSelector,
	getBrandsOptionsSelector,
	getChosenBrandSelector,
	getIsBrandsLoadingSelector,
	getSearchedNumberSelector,
} from '../../selectors.js';

const BrandsList = () => {
	const dispatch = useDispatch();

	const brands = useSelector(getBrandsOptionsSelector());
	const chosenBrand = useSelector(getChosenBrandSelector());
	const isLoading = useSelector(getIsBrandsLoadingSelector());
	const error = useSelector(getBrandsErrorSelector());
	const searchedNumber = useSelector(getSearchedNumberSelector());

	const handleChoose = brand => {
		dispatch(setChosenBrand(brand));
		dispatch(getAnalogsThunk(brand));
	};

	if (isLoading) {
		return (
			<div className="text-center py-3">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Загрузка...</span>
				</div>
			</div>
		);
	}

	if (error) return null;

	if (!searchedNumber) return null;

	if (brands.length === 0) {
		return <p className="text-muted mb-0">Производители не найдены</p>;
	}

	return (
		<div className="list-group">
			{brands.map(brand => (
				<button
					key={brand.value}
					type="button"
					className={`list-group-item list-group-item-action ${
						chosenBrand?.value === brand.value ? 'active' : ''
					}`}
					onClick={() => handleChoose(brand)}
				>
					{brand.label}
				</button>
			))}
		</div>
	);
};

export { BrandsList };
