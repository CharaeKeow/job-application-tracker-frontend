import Link from 'next/link';

export default function Page() {
	return (
		<main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col p-6">
			<Link
				className="flex h-12 w-fit items-center justify-center self-end rounded-xl bg-gray-800 px-6 py-2 text-base font-medium text-white hover:bg-gray-700"
				href="/job-application/create"
			>
				Add a New Job
			</Link>
		</main>
	);
}
