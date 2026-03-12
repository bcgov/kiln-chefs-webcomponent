import { type RequestHandler } from '@sveltejs/kit';
import fetchAttachment from '$lib/fetchAttachment';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.attachmentId) {
		return new Response("Can't fetch attachment, attachmentId missing", { status: 500 });
	}
	const data = await fetchAttachment(params.attachmentId);
	return new Response(JSON.stringify(data));
};
