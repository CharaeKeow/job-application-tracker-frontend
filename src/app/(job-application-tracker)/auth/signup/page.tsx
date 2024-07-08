import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import GithubButton from '@/src/components/buttons/github-button';
import GoogleButton from '@/src/components/buttons/google-button';

export default async function SignIn() {
	const session = await getServerSession();

	// redirect to home if logged in
	if (session) {
		redirect('/');
	}

	return (
		<main
			className="flex items-center justify-center"
			style={{ height: 'calc(100vh - 68px - 100px)' }}
		>
			<div className="relative mx-auto flex flex-col space-y-2.5 p-6">
				<h1 className="mb-3 text-center text-3xl font-semibold">
					Create Account
				</h1>
				<div className="mt-4 flex w-[320px] flex-col gap-2">
					<GoogleButton />
					<GithubButton />
				</div>
			</div>
		</main>
	);
}
