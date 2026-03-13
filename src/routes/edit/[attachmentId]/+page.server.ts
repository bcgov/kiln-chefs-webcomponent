import type { PageServerLoad } from './$types';
import { requireAuth } from '$lib/requireAuth';

export const load: PageServerLoad = async () => {
	const { user, session } = requireAuth();
	return { user, session };
};
