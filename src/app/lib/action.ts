'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import getConfig from 'next/config';

import { authOptions } from '../api/auth/[...nextauth]/route';
import { post } from '../utils/fetch.util';
import { JobApplication } from '../types/job-application';
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
		const res = await post(API_BASE_URL + 'job/create', {
			userId,
			jobApplication,
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

	console.log(formData);
	console.log({ rating });

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
