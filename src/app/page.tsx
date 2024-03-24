import Link from 'next/link';

export default function Page() {
	return (
		<main className="w-full max-w-7xl flex flex-col min-h-screen mx-auto p-6">
			<Link
				className="bg-gray-800 rounded-xl px-6 py-2 w-fit h-12 text-white font-medium text-base flex items-center justify-center self-end hover:bg-gray-700"
				href="/job-application/create"
			>
				Add a New Job
			</Link>
		</main>
	);
}
