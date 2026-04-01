import { CHEFS_SERVER_URL, CHEFS_FORM_ID, CHEFS_API_KEY } from '$env/static/private';
import tryCatch from '$lib/tryCatch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { requireAuth } from '$lib/requireAuth';
import fetchJson from '$lib/fetchJson';

export const load: PageServerLoad = async ({ url }) => {
	requireAuth();
	const submissionId = url.searchParams.get('s');
	const formId = CHEFS_FORM_ID;
	const [data, chefsError] = await fetchJson(
		`${CHEFS_SERVER_URL}/gateway/v1/auth/token/forms/${formId}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + btoa(`${formId}:${CHEFS_API_KEY}`)
			},
			body: JSON.stringify({ formId })
		}
	);
	if (chefsError) {
		console.error(chefsError);
		error(500, chefsError);
	}
	if (!data?.token) {
		error(500, { message: "Can't get auth token from CHEFS" });
	}
	return {
		formId,
		submissionId,
		authToken: data.token
	};
};
