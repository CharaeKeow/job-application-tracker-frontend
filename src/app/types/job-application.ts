export enum CompanyType {
	startup = 'Startup',
	mnc = 'MNC',
	others = 'Others',
}

export enum Status {
	bookmarked = 'Bookmarked',
	applying = 'Applying',
	applied = 'Applied',
	interviewing = 'Interviewing',
	negotiating = 'Negotiating',
	accepted = 'Accepted',
	declined = 'Declined',
	rejected = 'Rejected',
	assessment = 'Assessment',
	withdrawn = 'Withdrawn',
	pending = 'Pending Review',
	ghosted = 'Ghosted',
}

export type JobApplication = {
	company: string;
	companyType: CompanyType;
	position: string;
	status: Status;
	link: string;
	description?: string;
	excitement?: number; // should add range checking here? Or at Zod-level. Go with latter for now
	dateApplied: Date;
};
