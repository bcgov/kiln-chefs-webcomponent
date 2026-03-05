import { CHEFS_SERVER_URL } from "$lib/constants";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, request }) => {
    // console.log(request.headers.get('X-Chefs-Gateway-Token'));
    const sent_data = request.body ? await request.clone().json() : null;
    console.log('Sent: \n', JSON.stringify(sent_data, null, 2));
    const response = await fetch(`${CHEFS_SERVER_URL}/app/webcomponents/v1/form-viewer/${params.formId}/submission/${params.submissionId}`, request);
    // console.log(await response.clone().json());
    if (!response.ok) {
        return new Response('Failed to fetch form submission', { status: response.status });
    }
    const data = await response.json();
    // console.log(JSON.stringify(data, null, 2));
    
    // return new Response(JSON.stringify(data));
    return new Response(JSON.stringify({
        "data": {
            "submit": true,
            "letter-date-e999c869-7738-47a9-b3ca-84e2f0bcf98c": "2024-06-17",
            "client-full-name-7666c5bf-e504-4141-b8bd-28e3917797c9": "John Doe",
        },
    }));
}
