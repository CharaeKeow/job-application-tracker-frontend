import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import getConfig from 'next/config';

import { User } from '@/src/app/types/user';
import { post } from '@/src/app/utils/fetch.util';

const { publicRuntimeConfig } = getConfig();
const API_BASE_URL = publicRuntimeConfig.API_BASE_URL;

async function getUser({ email, provider }: Pick<User, 'email' | 'provider'>) {
	try {
		const { exist, id = null } = await post(
			API_BASE_URL + 'user/check-user-exist',
			{
				email,
				provider,
			},
		);

		return { exist, id };
	} catch (error) {
		console.error('Failed to fetched user: ', error);
		throw new Error('Failed to fetch user.');
	}
}

async function saveUser(user: User) {
	try {
		await post(API_BASE_URL + 'user/save-user', { user });
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
			session?: any;
		}) {
			const { name, email, image } = user;
			const { provider } = account; // provider is stored in account object

			console.log({ user });

			// check if user exist
			const { exist: userExist, id } = await getUser({ email, provider });

			// if user not exist, save data in DB
			if (userExist) {
				user.dbId = id;
			} else {
				const res = await saveUser({ name, email, image, provider });
			}

			console.log({ user });
			return true;
		},
		async jwt({ token, user }: { token: any; user: any }) {
			// console.log({ jwtToken: token, jwtUser: user });
			if (user) {
				token.userId = user.dbId;
			}

			return token;
		},
		async session({
			session,
			token,
			user,
		}: {
			session: any;
			token: any;
			user: any;
		}) {
			session.userId = token.userId;
			// console.log({ session, token });
			return session;
		},
	},
};

export const handler = NextAuth(authOptions);

// handle GET and POST request
export { handler as GET, handler as POST };
