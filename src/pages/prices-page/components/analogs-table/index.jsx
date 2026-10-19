import {
	getAnaloguesErrorSelector,
	getAnaloguesTableSelector,
	getIsAnaloguesLoadingSelector,
} from '../../selectors.js';
import { useSelector } from 'react-redux';
import { COLUMNS } from '../../table-constants.js';

const AnalogsTable = () => {
	const analoguesTable = useSelector(getAnaloguesTableSelector());

	const isAnaloguesLoading = useSelector(getIsAnaloguesLoadingSelector());

	const error = useSelector(getAnaloguesErrorSelector());

	const renderBody = () => {
		if (isAnaloguesLoading) {
			return (
				<tr>
					<td colSpan={COLUMNS.length} className="text-center py-4">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Загрузка...</span>
						</div>
					</td>
				</tr>
			);
		}

		if (error) {
			return (
				<tr>
					<td colSpan={COLUMNS.length} className="text-center text-danger py-4">
						{error}
					</td>
				</tr>
			);
		}

		if (analoguesTable.length === 0) {
			return (
				<tr>
					<td colSpan={COLUMNS.length} className="text-center text-muted py-4">
						Ничего не найдено
					</td>
				</tr>
			);
		}

		return analoguesTable.map(analogue => (
			<tr key={analogue.id}>
				{COLUMNS.map(column => (
					<td key={column.id}>{analogue[column.id]}</td>
				))}
			</tr>
		));
	};

	return (
		<div className="table-responsive mt-5">
			<table className="table table-bordered table-striped table-hover align-middle">
				<thead>
					<tr>
						{COLUMNS.map(column => (
							<th key={column.id} scope="col">
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{renderBody()}</tbody>
			</table>
		</div>
	);
};

export { AnalogsTable };
