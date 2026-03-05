import { CHEFS_SERVER_URL } from '$lib/constants';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request }) => {
    console.log(params.slug);
    console.log(request.headers);
    // const data = await request.clone().json();
    // console.log('Send: \n', JSON.stringify(data, null, 2));
    return forwardRequest(request, params.slug);
};

export const POST: RequestHandler = async ({ params, request }) => {
    console.log(params.slug);
    const data = await request.clone().json();
    console.log('Sent: \n', JSON.stringify(data, null, 2));
    return forwardRequest(request, params.slug);
};

async function forwardRequest(request: Request, slug: string | undefined): Promise<Response> {
    try {
        const forwardUrl = new URL(`${CHEFS_SERVER_URL}/app/${slug}`);
        console.log(forwardUrl.toString());
        const response = await fetch(forwardUrl.toString(), request);

        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Failed to forward request' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const headers = new Headers(response.headers);
        headers.delete('Content-Encoding');
        headers.delete('Transfer-Encoding');

        const data = await response.json();
        console.log('Received: \n', JSON.stringify(data, null, 2));
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: headers
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to forward request' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}