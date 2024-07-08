/**
 * Helper function perform a fetch() GET request.
 * @param url - The endpoint for the GET request
 */
export async function get({ url, headers }: { url: string; headers?: {} }) {
	const requestOptions = {
		method: 'GET',
		headers: {
			...headers,
		},
	};
	const response = await fetch(url, requestOptions);

	return response.json();
}

/**
 * Helper function to wrap fetch() POST request
 */
// TODO: Find the type for `body` and `header`?
export async function post({
	url,
	body,
	headers,
}: {
	url: string;
	body: any;
	headers?: any;
}) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: JSON.stringify(body),
	};

	const response = await fetch(url, {
		...requestOptions,
		cache: 'no-cache', // TODO: See how to handle this
	});

	return response.json();
}
