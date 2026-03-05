import { CHEFS_SERVER_URL } from "$lib/constants";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, request }) => {
    // const sent_data = request.body ? await request.clone().json() : null;
    // console.log('Sent: \n', JSON.stringify(sent_data, null, 2));
    const response = await fetch(`${CHEFS_SERVER_URL}/app/webcomponents/v1/form-viewer/${params.formId}/schema`, request);
    if (!response.ok) {
        return new Response('Failed to fetch form schema', { status: response.status });
    }
    const data = await response.json();
    console.log('Received: \n', JSON.stringify(data, null, 2));
    return new Response(JSON.stringify(data));
}
