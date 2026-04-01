import tryCatch from './tryCatch';

export default async function fetchJson(url: RequestInfo | URL, init?: RequestInit) {
	return tryCatch(async () => {
		const res = await fetch(url, init);
		const ct = res.headers.get('content-type') ?? '';

		if (!res.ok) {
			const preview = await res.clone().text();
			throw new Error(
				`HTTP ${res.status} for ${url}. content-type=${ct}. body=${sanitizeForLogs(preview)}`
			);
		}

		if (!ct.includes('application/json') && !ct.includes('+json')) {
			const preview = await res.clone().text();
			throw new Error(`Expected JSON but got ${ct} from ${url}. body=${sanitizeForLogs(preview)}`);
		}
		return await res.json();
	});
}

function sanitizeForLogs(input: string) {
	const max = 1000;
	if (input.length > max) return input.slice(0, max) + '…[truncated]';
	return input;
}
