import { getServerSession } from 'next-auth';
import jwt from 'jsonwebtoken';

import { authOptions } from '../app/api/auth/[...nextauth]/route';

/**
 * Sign userId into JWT token
 */
async function signJwtToken() {
	const { userId } = await getServerSession(authOptions);
	const secret = process.env.JWT_SECRET ?? '';
	const token = jwt.sign({ userId }, secret, { expiresIn: '10m' });

	return token;
}

/**
 * Return Authorization header to be appended to requests
 */
export default async function getAuthHeader() {
	const token = await signJwtToken();

	return { Authorization: `Bearer ${token}` };
}
