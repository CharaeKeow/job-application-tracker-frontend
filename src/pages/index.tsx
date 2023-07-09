import useSWR from 'swr';

import { fetcher } from '@/utils/fetcher';
import Seo from '@/components/Seo';

export default function Home() {
	const { data, error } = useSWR('http://localhost:8000', fetcher);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<Seo />
			{data ? <p>Data from backend: {data.message}</p> : <p>Loading...</p>}
		</div>
	);
}
