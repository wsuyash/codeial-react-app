import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from '../utils';

const customFetch = async (url, { body, ...custonConfig }) => {
	const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

	const headers = {
		'content-type': 'application/json',
		Accept: 'application/json',
	}

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const config = {
		...custonConfig,
		headers: {
			...headers,
			...custonConfig.headers,	
		},
	}

	if (body) {
		config.body = JSON.stringify(body);
	}

	try {
		const response = await fetch(url, config);

		const data = await response.json();

		if (data.success) {
			return {
				data: data.data,
				success: true,
			};
		}

		throw new Error(data.message);

	} catch (error) {
		console.log(error);	
		return {
			message: error.message,
			success: false,
		};
	}
};

export const getPosts = (page = 1, limit = 5) => {
	return customFetch(API_URLS.posts(page, limit), {
		method: 'GET'
	});
};



































