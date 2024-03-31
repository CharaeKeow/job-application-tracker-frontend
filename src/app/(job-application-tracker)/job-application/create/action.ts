'use server';

import { revalidatePath } from 'next/cache';
import getConfig from 'next/config';

import { post } from '../../../utils/fetch.util';
import { JobApplication } from '../../../types/job-application';
import { redirect } from 'next/navigation';
import getAuthHeader from '@/src/app/utils/sign-auth-token.util';

const { publicRuntimeConfig } = getConfig();
const API_BASE_URL = publicRuntimeConfig.API_BASE_URL;

export type State = {
	errors?: {}; // TODO: Add error for fields here
	message?: null | string;
};

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

	// TODO: Function to sign the token (so just call it?)
	const authHeader = await getAuthHeader();

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

	try {
		await post({
			url: `${API_BASE_URL}job-application/create`,
			body: {},
			headers: { ...authHeader },
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
