import type { PageServerLoad } from './$types';
import { CHEFS_SERVER_URL } from '$lib/constants';

export const load: PageServerLoad = async () => {
	const formId = '06dcda56-c664-4e66-aa77-edcf71f78533';
	const apiKey = '2a50b627-1b3b-40b4-8d9b-0ea01d290bb9';
	try {
		const response = await fetch(`${CHEFS_SERVER_URL}/app/gateway/v1/auth/token/forms/${formId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + btoa(`${formId}:${apiKey}`)
			},
			body: JSON.stringify({ formId })
		});

		if (!response.ok) {
			throw new Error('Failed to fetch auth token');
		}

		const {token}: {token: string} = await response.json();
		return {
            formId,
            token
        };
	} catch (error) {
		throw new Error('Failed to get auth token');
	}
};
