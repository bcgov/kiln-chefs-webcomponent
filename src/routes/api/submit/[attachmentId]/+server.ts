import type { RequestHandler } from "@sveltejs/kit";
import { SAVE_FORM_DATA_ENDPOINT_URL } from "$env/static/private";
import fetchAttachment from "$lib/fetchAttachment";
import type { Submission } from "$lib/types/chefs-web-component";

export const POST: RequestHandler = async ({ params, request }) => {
    const url = SAVE_FORM_DATA_ENDPOINT_URL;
    if (!url) {
        return new Response('Server configuration error: Missing endpoint SAVE_FORM_DATA_ENDPOINT_URL', { status: 500 });
    }
    if (!params.attachmentId) {
		return new Response("Can't fetch attachment for submit, attachmentId missing", { status: 500 });
	}
    const attachment = await fetchAttachment(params.attachmentId);
    const {submission} = await request.json() as {submission: Submission};

    const action = {
        submit: 'save',
    }[submission.component.action] ?? submission.component.action

    const payload = {
        action,
        formState: submission.data,
        formDefinition: attachment.form_definition,
        metadata: {
            updated_date: new Date().toISOString()
        },
        // items
        // sessionParams
        // groupState
    }

    console.log('Submitted: ', JSON.stringify(payload, null, 2));

    return new Response(JSON.stringify(submission), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}
