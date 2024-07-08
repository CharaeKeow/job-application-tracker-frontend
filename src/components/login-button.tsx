'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';

export default function LoginButton({ auth }: { auth?: ClientSafeProvider }) {
	return (
		<button onClick={() => signIn(auth?.id || '')}>
			{/* {auth ? `Sign in with {''} {auth?.name}` : 'Login'} */}
			Sign in with {''} {auth?.name}
		</button>
	);
}
