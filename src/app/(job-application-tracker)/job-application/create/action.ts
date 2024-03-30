'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';

import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { post } from '../../../utils/fetch.util';
import { JobApplication } from '../../../types/job-application';
import { redirect } from 'next/navigation';

const { publicRuntimeConfig } = getConfig();
const API_BASE_URL = publicRuntimeConfig.API_BASE_URL;

export type State = {
	errors?: {}; // TODO: Add error for fields here
	message?: null | string;
};

// BE request
async function saveJobApplication({
	userId,
	jobApplication,
}: {
	userId: string;
	jobApplication?: JobApplication;
}) {
	try {
		const res = await post({
			url: API_BASE_URL + 'job-application/create',
			body: {
				userId,
				jobApplication,
			},
		});
	} catch (error) {
		console.error('Failed to save job application: ', error);
		throw new Error('Failed to save job application');
	}
}

export async function createJobApplication(
	rating: number,
	prevState: State,
	formData: FormData,
) {
	// const session = await getServerSession(authOptions);

	// console.log({ session });
	const {
		company,
		companyType,
		position,
		status,
		link,
		description,
		excitement,
		dateApplied,
	} = Object.fromEntries(formData.entries());

	// const jobApplication: JobApplication = Object.fromEntries(formData.entries());

	// get userId from session
	const { userId } = await getServerSession(authOptions);
	const secret = process.env.JWT_SECRET ?? '';

	// TODO: Function to sign the token (so just call it?)
	const token = jwt.sign({ userId }, secret, { expiresIn: '10m' });

	// console.log(formData);
	console.log({
		company,
		companyType,
		position,
		status,
		link,
		description,
		excitement,
		dateApplied,
	});
	// console.log({ rating });
	console.log({ userId });

	try {
		await post({
			url: 'http://localhost:8000/api/job-application/create',
			body: {},
			headers: { Authorization: token },
		});
	} catch (error) {
		console.error(error);
	}

	// ! Think there's a better way to achieve this?
	// const jobApplication: JobApplication = {
	// 	company: company,
	// 	companyType,
	// 	position,
	// 	status,
	// 	link,
	// 	description,
	// 	excitement,
	// 	dateApplied,
	// }

	try {
		// request to backend to save the data
		// await saveJobApplication({ userId });
	} catch (error) {
		console.error(error);
		return {
			message: 'Database Error: Failed adding a new job application',
		};
	}

	revalidatePath('/');
	redirect('http://localhost:3000/job-application/create');
}
