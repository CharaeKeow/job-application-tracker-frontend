/**
 * Helper function perform a fetch() GET request.
 * @param url - The endpoint for the GET request
 */
export async function get(url: string) {
	const requestOptions = {
		method: 'GET',
	};
	const response = await fetch(url, requestOptions);

	return await response.json();
}

/**
 * Helper function to wrap fetch() POST request
 * @param route
 * @returns
 */
// TODO: Find the type for `body`?
export async function post(url: string, body: any) {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	};

	const response = await fetch(url, {
		...requestOptions,
		cache: 'no-cache', // TODO: See how to handle this
	});

	return await response.json();
}
