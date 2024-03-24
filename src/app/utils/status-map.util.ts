import { Status } from '../types/job-application';

// Define a mapping of statuses to their corresponding text with emojis
const statusMap: Record<Status, string> = {
	[Status.bookmarked]: 'Bookmarked 🔖',
	[Status.applying]: 'Applying ✍️',
	[Status.applied]: 'Applied 📩',
	[Status.interviewing]: 'Interviewing 🙋‍♂️',
	[Status.negotiating]: 'Negotiating 💬',
	[Status.accepted]: 'Accepted ✅',
	[Status.declined]: 'Declined 🚫',
	[Status.rejected]: 'Rejected ❌',
	[Status.assessment]: 'Assessment 📝',
	[Status.withdrawn]: 'Withdrawn 🚪',
	[Status.pending]: 'Pending Review 🕒',
	[Status.ghosted]: 'Ghosted 👻',
};

// Reverse mapping to get the enum value from the emoji+text string
const reverseStatusMap: Record<string, Status> = Object.fromEntries(
	Object.entries(statusMap).map(([key, value]) => [value, key as Status]),
);

/**
 * Function to get the text + emoji version of the status enum
 */
export function getStatusWithEmoji(status: Status): string {
	return statusMap[status];
}

/**
 * Function to get the enum value (original text) from emoji + text string
 */
export function getEnumFromStatusWithEmoji(statusWithEmoji: string): Status {
	return reverseStatusMap[statusWithEmoji];
}
