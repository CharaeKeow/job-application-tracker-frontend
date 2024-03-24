'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFormState } from 'react-dom';

import { Button } from '@/src/app/ui/button';
import { State, createJobApplication } from '@/src/app/lib/action';
import StarRating from '../star-rating';

export default function Form({}: // jobApplication,
{
	// jobApplication: JobApplication;
}) {
	const initialState = { message: null, errors: {} };
	const [rating, setRating] = useState(0);
	const createJobApplicationWithRating = createJobApplication.bind(
		null,
		rating,
	);

	const [state, dispatch] = useFormState<State, FormData>(
		createJobApplicationWithRating,
		initialState,
	);

	return (
		<form action={dispatch}>
			<div className="rounded-md bg-gray-50 p-4 md:p-6">
				{/* Job title: input text */}
				<div className="mb-4">
					<label htmlFor="job-title" className="mb-2 block text-sm font-medium">
						Job Title: <span className="text-red-600">*</span>
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="job-title"
								name="job-title"
								type="text"
								placeholder="Job Title"
								required
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				{/* Company name: input text */}
				<div className="mb-4">
					<label htmlFor="company" className="mb-2 block text-sm font-medium">
						Company: <span className="text-red-600">*</span>
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="company"
								name="company"
								type="text"
								placeholder="Company Name"
								required
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				{/* URL: input text, optional */}
				<div className="mb-4">
					<label htmlFor="job-url" className="mb-2 block text-sm font-medium">
						Job Post URL:
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<input
								id="job-url"
								name="job-url"
								type="text"
								placeholder="Link to the original job post"
								className="peer block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
							/>
						</div>
					</div>
				</div>

				{/* Company type: dropdown, optional */}
				<fieldset className="mb-4">
					<legend className="mb-2 block text-sm font-medium">
						Company Type:
					</legend>
					<div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
						<div className="flex flex-col gap-2">
							<div className="flex items-center">
								<input
									id="startup"
									name="company-type"
									type="radio"
									value="startup"
									className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
								/>
								<label
									htmlFor="startup"
									className="ml-4 py-1.5 text-sm font-medium text-gray-600"
								>
									Startup
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="mnc"
									name="company-type"
									type="radio"
									value="mnc"
									className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
								/>
								<label
									htmlFor="mnc"
									className="ml-4 py-1.5 text-sm font-medium text-gray-600"
								>
									MNC
								</label>
							</div>
							<div className="flex items-center">
								<input
									id="other"
									name="company-type"
									type="radio"
									value="other"
									className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
								/>
								<label
									htmlFor="other"
									className="ml-4 py-1.5 text-sm font-medium text-gray-600"
								>
									Others
								</label>
							</div>
						</div>
					</div>
				</fieldset>

				{/* Job Description: textarea, optional */}
				<div className="mb-4">
					<label
						htmlFor="description"
						className="mb-2 block text-sm font-medium"
					>
						Job Description
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<textarea
								name="description"
								id="description"
								rows={10}
								placeholder="Enter job description here"
								className="w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
							></textarea>
						</div>
					</div>
				</div>

				{/* Star Rating */}
				<div className="mb-4">
					<label
						htmlFor="excitement"
						className="mb-2 block text-sm font-medium"
					>
						Excitement!
					</label>
					<div className="relative mt-2 rounded-md">
						<div className="relative">
							<StarRating rating={rating} onRatingChange={setRating} />
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-end gap-4">
					<Link
						href="/"
						className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
					>
						Cancel
					</Link>
					<Button type="submit">Add Job Application</Button>
				</div>
			</div>
		</form>
	);
}
