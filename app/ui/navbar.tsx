'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { titilliumWeb } from './fonts';

function AuthButton() {
	const { data: session } = useSession();
	console.log({ session });

	if (session) {
		return (
			<div className="flex items-center gap-2">
				{session?.user?.image && (
					<img
						className="rounded-full w-8 h-8"
						src={session?.user?.image}
						alt="User image"
					/>
				)}
				<p className="text-sm">{session?.user?.name ?? session?.user?.email}</p>
				<button
					className="text-sm text-red-500 hover:underline transition-all"
					onClick={() => signOut()}
				>
					Sign Out
				</button>
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2">
			<Link
				className="font-medium rounded-md border border-gray-800 bg-white px-4 py-2 text-sm text-black transition-colors hover:bg-gray-100"
				href="/auth/signin"
			>
				Sign In
			</Link>
			<Link
				className="font-medium rounded-md bg-gray-800 px-4 py-2 text-sm text-white transition-colors hover:bg-gray-700"
				href="/auth/signup"
			>
				Create Account
			</Link>
		</div>
	);
}

export default function Navbar() {
	return (
		<div className="w-full min-h-[68px] sticky top-0 flex justify-center">
			<header className="max-w-7xl w-full flex items-center justify-between p-3">
				<Link
					href="/"
					className={`${titilliumWeb.className} font-bold text-2xl`}
				>
					Job Application Tracker 💼💻
				</Link>
				<AuthButton />
			</header>
		</div>
	);
}
