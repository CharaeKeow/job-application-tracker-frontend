/* eslint-disable @next/next/no-img-element */

'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { titilliumWeb } from './fonts';

function AuthButton() {
	const { data: session } = useSession();

	if (session) {
		return (
			<div className="flex items-center gap-2">
				{session?.user?.image && (
					<img
						className="size-8 rounded-full"
						src={session?.user?.image}
						alt="User"
					/>
				)}
				<p className="text-sm">{session?.user?.name ?? session?.user?.email}</p>
				<button
					type="button"
					className="text-sm text-red-500 transition-all hover:underline"
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
				className="rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-100"
				href="/auth/signin"
			>
				Sign In
			</Link>
			<Link
				className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
				href="/auth/signup"
			>
				Create Account
			</Link>
		</div>
	);
}

export default function Navbar() {
	return (
		<div className="sticky top-0 flex min-h-[68px] w-full justify-center">
			<header className="flex w-full max-w-7xl items-center justify-between p-3">
				<Link
					href="/"
					className={`${titilliumWeb.className} text-2xl font-bold`}
				>
					Job Application Tracker 💼💻
				</Link>
				<AuthButton />
			</header>
		</div>
	);
}
