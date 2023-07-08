import useSWR from 'swr';

// TODO: Clean up into separate, probably `api`?, file
const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('An error occured while fetching the data');
	}

	const data = await response.json();
	return data;
};

export default function Home() {
	const { data, error } = useSWR('http://localhost:8000', fetcher);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			{data ? <p>Data from backend: {data.message}</p> : <p>Loading...</p>}
		</div>
	);
}
