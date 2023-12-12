import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import GoogleButton from '@/app/ui/buttons/google-button';
import GithubButton from '@/app/ui/buttons/github-button';

export default async function SignIn() {
	const session = await getServerSession();

	// redirect to home if logged in
	if (session) {
		redirect('/');
	}

	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex max-w-[400px] flex-col space-y-2.5 p-4">
				<h1 className="text-2xl font-semibold mb-3">Create Account</h1>
				<div className="mt-4 flex flex-col gap-2">
					<GoogleButton />
					<GithubButton />
				</div>
			</div>
		</main>
	);
}
