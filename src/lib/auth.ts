import { betterAuth } from 'better-auth';
import { genericOAuth, keycloak } from 'better-auth/plugins';
import {
	BETTER_AUTH_URL,
	KEYCLOAK_CLIENT_ID,
	KEYCLOAK_CLIENT_SECRET,
	KEYCLOAK_ISSUER
} from '$env/static/private';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

export const auth = betterAuth({
	baseURL: BETTER_AUTH_URL,
	plugins: [
		genericOAuth({
			config: [
				keycloak({
					clientId: KEYCLOAK_CLIENT_ID,
					clientSecret: KEYCLOAK_CLIENT_SECRET,
					issuer: KEYCLOAK_ISSUER
				})
			]
		}),
		sveltekitCookies(getRequestEvent)
	]
});
