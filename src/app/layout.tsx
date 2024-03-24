import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import '@/app/ui/global.css';
import { inter } from '@/src/app/ui/fonts';
import SessionProvider from '@/src/app/ui/session-provider';
import Navbar from '@/src/app/ui/navbar';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata: Metadata = {
	title: 'Job Application Tracker',
	description: 'An application to track your job application hehe.',
};

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	console.log({ session });

	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<SessionProvider session={session}>
					<div className="flex h-screen flex-col md:overflow-hidden">
						<Navbar />
						{children}
					</div>
				</SessionProvider>
			</body>
		</html>
	);
}
