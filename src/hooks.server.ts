import { auth } from '$lib/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/api/auth')) {
		return svelteKitHandler({ event, resolve, auth, building });
	}
	const session = await auth.api.getSession({ headers: event.request.headers });
	if (!session) {
		// No session present, initiating Keycloak signin
		const res = await auth.api.signInWithOAuth2({
			body: {
				providerId: 'keycloak',
				callbackURL: event.url.pathname
			}
		});
		redirect(302, res.url);
	}
	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};
