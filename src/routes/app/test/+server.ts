import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, request }) => {
    console.log('foo');
    console.log(request.headers)
    return new Response(JSON.stringify({
        "data": [
            {
                "id": "1",
                "value": "Option 1"
            },
            {
                "id": "2",
                "value": "Option 2"
            },
            {
                "id": "3",
                "value": "Option 3"
            }
        ],
    }));
}