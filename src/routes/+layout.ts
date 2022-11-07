import type { Load } from '@sveltejs/kit';

export const prerender = true;

export const load: Load = async ({ url }) => {
	const currentRoute = url.pathname;

	return {
		currentRoute
	};
};
