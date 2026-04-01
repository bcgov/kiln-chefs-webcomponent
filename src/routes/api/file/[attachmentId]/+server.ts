import type { RequestHandler } from '@sveltejs/kit';
import { randomUUID } from 'crypto';

export const POST: RequestHandler = async ({ params, request }) => {
	if (!params.attachmentId) {
		return new Response("Can't fetch attachment for submit, attachmentId missing", { status: 500 });
	}
	console.log(request.headers);
	console.log(await request.clone().text());
	const response = {
		id: randomUUID(),
		originalName: 'foo'
	};
	return new Response(JSON.stringify(response), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};
