import { CHEFS_SERVER_URL } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
	console.log(params.slug);
	// console.log(request.headers);
	// const data = await request.clone().json();
	// console.log('Send: \n', JSON.stringify(data, null, 2));
	return forwardRequest(request, params.slug);
};

export const POST: RequestHandler = async ({ params, request, url }) => {
	console.log(params.slug);
	// const data = await request.clone().text();
	// console.log('Sent: \n', JSON.stringify(data, null, 2));
	return forwardRequest(request, params.slug, url.searchParams);
};

async function forwardRequest(
	request: Request,
	slug: string | undefined,
	query?: URLSearchParams
): Promise<Response> {
	try {
		const forwardUrl = new URL(`${CHEFS_SERVER_URL}/${slug}${query ? '?' + query.toString() : ''}`);
		console.log(forwardUrl.toString());
		const response = await fetch(forwardUrl.toString(), request);

		if (!response.ok) {
			const error = new Error('Failed to forward request: ' + response.status);
			console.error(error);
			return new Response(JSON.stringify({ error }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const headers = new Headers(response.headers);
		headers.delete('Content-Encoding');
		headers.delete('Transfer-Encoding');

		// if (headers.get('content-type')?.includes('application/json')) {
		// 	const preview = await response.clone().json();
		// 	console.log(JSON.stringify(preview, null, 2));
		// }

		return new Response(response.body, {
			status: response.status,
			headers: headers
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
