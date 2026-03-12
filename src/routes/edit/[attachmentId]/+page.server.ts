import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user || !event.locals.session) {
		error(401, { message: 'not logged in' });
	}
	return { user: event.locals.user, session: event.locals.session };
};
