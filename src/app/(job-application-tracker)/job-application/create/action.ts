'use server';

import { revalidatePath } from 'next/cache';
import getConfig from 'next/config';
import { redirect } from 'next/navigation';

import { post } from '@/src/utils/fetch.util';
import getAuthHeader from '@/src/utils/sign-auth-token.util';

import type {
	CompanyType,
	JobApplication,
} from '../../../../types/job-application';
import { Status } from '../../../../types/job-application';

const { publicRuntimeConfig } = getConfig();
const { API_BASE_URL } = publicRuntimeConfig;

export type State = {
	errors?: {}; // TODO: Add error for fields here
	message?: null | string;
};

export async function createJobApplication(
	rating: number,
	prevState: State,
	formData: FormData,
) {
	const { company, companyType, position, link, description } =
		Object.fromEntries(formData.entries()) as Record<string, string>;

	const jobApplication: JobApplication = {
		company,
		companyType: companyType as CompanyType,
		position,
		link,
		description,
		status: Status.applying, // TODO: Should I add this to the form indeed?
		excitement: rating,
		dateApplied: new Date(),
	};

	// TODO: Function to sign the token (so just call it?)
	const authHeader = await getAuthHeader();

	try {
		await post({
			url: `${API_BASE_URL}job-application/create`,
			body: { jobApplication },
			headers: { ...authHeader },
		});
	} catch (error) {
		console.error(error);
		return {
			message: 'Fetch error', // TODO: Proper message
		};
	}

	revalidatePath('/');
	redirect('http://localhost:3000/job-application/create');
}
