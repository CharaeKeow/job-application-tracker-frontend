'use client';

import type { ClientSafeProvider } from 'next-auth/react';
import { signIn } from 'next-auth/react';

export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
	return (
		<button type="submit" onClick={() => signIn(auth?.id || '')}>
			{/* {auth ? `Sign in with {''} {auth?.name}` : 'Login'} */}
			Sign in with {auth?.name}
		</button>
	);
}
