import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import GoogleButton from '@/src/app/ui/buttons/google-button';
import GithubButton from '@/src/app/ui/buttons/github-button';

export default async function SignIn() {
	const session = await getServerSession();

	// redirect to home if logged in
	if (session) {
		redirect('/');
	}

	return (
		<main
			className="flex justify-center items-center"
			style={{ height: 'calc(100vh - 68px - 100px)' }}
		>
			<div className="relative mx-auto flex flex-col space-y-2.5 p-6">
				<h1 className="text-3xl text-center font-semibold mb-3">
					Create Account
				</h1>
				<div className="mt-4 flex flex-col gap-2 w-[320px]">
					<GoogleButton />
					<GithubButton />
				</div>
			</div>
		</main>
	);
}
