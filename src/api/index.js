import { BASE_URL, DEFAULT_KEY } from './constants.js';

export const makeRequest = async ({ query = '', body, method = 'GET', key = DEFAULT_KEY, signal } = {}) => {
	const queryString = query ? `&${query}` : '';
	const requestUrl = `${BASE_URL}/?key=${key}${queryString}`;

	const response = await fetch(requestUrl, {
		method,
		signal,
		...(body
			? {
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ body }),
				}
			: {}),
	});

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`);
	}

	return await response.json();
};
