import type { RequestHandler } from '@sveltejs/kit';
import customForm from '$lib/sample-data/custom-form.json';
import fetchAttachment from '$lib/fetchAttachment';

export const GET: RequestHandler = async ({ params, request }) => {
	if (!params.attachmentId) {
		return new Response("Can't fetch attachment, attachmentId missing", { status: 500 });
	}
	const icmData = await fetchAttachment(params.attachmentId);

	// ICM data not in formio schema yet
	const data = customForm;
	return new Response(JSON.stringify(data));
};
