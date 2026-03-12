import { getRequestEvent } from '$app/server';
import { KILN_LOAD_BOUND_FORM_ENDPOINT } from '$env/static/private';
import { error } from '@sveltejs/kit';

export default async function fetchAttachment(attachmentId: string) {
	const { locals } = getRequestEvent();
	const url = KILN_LOAD_BOUND_FORM_ENDPOINT;
	if (!locals.user || !locals.session) {
		error(401, 'unauthorized');
	}
	if (!url) {
		return new Response(
			'Server configuration error: Missing endpoint KILN_LOAD_BOUND_FORM_ENDPOINT',
			{ status: 500 }
		);
	}
	let response: Response;

	try {
		response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				attachmentId: attachmentId,
				token: locals.session.token
			})
		});
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : String(err);
		console.error('Network error while fetching form schema:', err);
		return new Response(`Network error: ${message}`, { status: 502 });
	}

	if (!response.ok) {
		const text = await response.text().catch(() => null);
		const detail = text ? ` - ${text}` : '';
		return new Response(`Failed to fetch form schema${detail}`, { status: response.status });
	}

	const data = await response.json();

	return data;
}
