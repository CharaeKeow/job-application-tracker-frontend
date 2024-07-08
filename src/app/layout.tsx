import '@/src/components/global.css';

import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';

import { inter } from '@/src/components/fonts';
import Navbar from '@/src/components/navbar';
import SessionProvider from '@/src/components/session-provider';

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
