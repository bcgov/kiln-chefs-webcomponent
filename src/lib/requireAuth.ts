import { error } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';

export function requireAuth() {
	const { locals } = getRequestEvent();

	if (!locals.user || !locals.session) {
		error(401, 'unauthorized');
	}

	return { user: locals.user, session: locals.session };
}
