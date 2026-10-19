import { useEffect, useState } from 'react';

export const useDebouncedValue = (value, ms = 300) => {
	const [input, setInput] = useState('');

	useEffect(() => {
		const id = setTimeout(() => {
			setInput(value);
		}, ms);

		return () => {
			clearTimeout(id);
		};
	}, [value, ms]);

	return input;
};
