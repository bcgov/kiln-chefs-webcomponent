import { LOAD_BOUND_FORM_ENDPOINT_URL } from "$env/static/private";

export default async function fetchAttachment(attachmentId: string) {
    const url = LOAD_BOUND_FORM_ENDPOINT_URL;
    if (!url) {
        return new Response('Server configuration error: Missing endpoint LOAD_BOUND_FORM_ENDPOINT_URL', { status: 500 });
    }
    let response: Response;

    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                attachmentId: attachmentId,
                username: 'DBELLBRO',
            }),
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