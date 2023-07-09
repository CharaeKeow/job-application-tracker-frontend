import Head from 'next/head';

const defaultMeta = {
	title: 'Job Application Tracker',
	description:
		'Track, manage, and organize your job applications with ease. Job Application Tracker is a powerful tool to keep all your job search activities in one place. Stay on top of your applications, deadlines, and interview schedules effortlessly. Take control of your job hunt today!',
	robots: 'follow, index',
};

type SeoProps = {
	templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
	const meta = { ...defaultMeta };
	meta['title'] = props.templateTitle ? `${props.templateTitle}` : meta.title;

	return (
		<Head>
			<title>{meta.title}</title>
			<meta name="description" content={meta.description}></meta>
			<meta name="robots" content={meta.robots}></meta>
		</Head>
	);
}
