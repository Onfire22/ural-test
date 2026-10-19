import { Header } from '../../components/header/index.jsx';
import { AnalogsTable } from './components/analogs-table/index.jsx';
import { BrandsSearch } from './components/brands-search/index.jsx';

const PricesPage = () => {
	return (
		<>
			<Header title="Проценка" />
			<div className="p-3">
				<BrandsSearch />
				<AnalogsTable />
			</div>
		</>
	);
};

export { PricesPage };
