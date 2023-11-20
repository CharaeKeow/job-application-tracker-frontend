import Link from 'next/link';

export default function Page() {
	return (
		<main className="flex min-h-screen flex-col p-6">
			<Link
				href="/login"
				className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
			>
				Login
			</Link>
			<p>
				No account?{' '}
				<Link
					href="/sign-up"
					className="font-medium text-blue-500 transition-colors md:text-base hover:underline hover:text-blue-600"
				>
					Sign up
				</Link>{' '}
				instead.
			</p>
		</main>
	);
}
