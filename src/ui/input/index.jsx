import { useEffect, useRef } from 'react';

const CustomInput = ({ id, value, onChange, error, handleClear, label, placeholder }) => {
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef?.current) {
			inputRef.current.focus();
		}
	}, [inputRef.current]);

	const onClear = () => {
		handleClear();
		inputRef.current?.focus();
	};

	return (
		<div>
			{label && (
				<label htmlFor={id} className="form-label">
					{label}
				</label>
			)}
			<div className="input-group has-validation">
				<input
					ref={inputRef}
					id={id}
					className={`form-control ${error ? 'is-invalid' : ''}`}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					autoComplete="off"
				/>
				{value && (
					<button type="button" className="btn btn-outline-secondary" onClick={onClear}>
						Очистить
					</button>
				)}
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	);
};

export { CustomInput };
