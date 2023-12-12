const prod = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	publicRuntimeConfig: {
		API_BASE_URL: prod ? '' : process.env.API_BASE_URL,
	},
};

module.exports = nextConfig;
