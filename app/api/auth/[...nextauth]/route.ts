import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { User } from '@/app/types/User';

async function getUser({ email, provider }: Pick<User, 'email' | 'provider'>) {
	try {
		// TODO: Create a wrapper for this, since I'll be using fetch a lot for BE call!
		const response = await fetch(
			'http://localhost:8000/api/user/check-user-exist',
			{
				method: 'POST',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, provider }),
			},
		);

		const { exist } = await response.json();

		return exist;
	} catch (error) {
		console.error('Failed to fetched user: ', error);
		throw new Error('Failed to fetch user.');
	}
}

async function saveUser(user: User) {
	try {
		console.log({ user });

		// TODO: Create a wrapper for this, since I'll be using fetch a lot for BE call!
		const response = await fetch('http://localhost:8000/api/user/save-user', {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ user }),
		});
	} catch (error) {
		console.error('Failed saving user data: ', error);
		throw new Error('Failed saving user.');
	}
}

export const authOptions = {
	pages: {
		signIn: '/auth/signin',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID ?? '',
			clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
		}),
	],
	callbacks: {
		async signIn({
			user,
			profile,
			account,
			credentials,
		}: {
			user: any;
			profile?: any;
			account: any;
			credentials?: any;
		}) {
			console.log({ user, profile, account, credentials });

			const { name, email, image } = user;
			const { provider } = account;

			// check if user exist
			const userExist = await getUser({ email, provider });

			console.log(userExist);

			// if user not exist, save data in DB
			if (!userExist) {
				const res = await saveUser({ name, email, image, provider });
			}

			return true;
		},
	},
};

export const handler = NextAuth(authOptions);

// handle GET and POST request
export { handler as GET, handler as POST };
