export default async function tryCatch<T>(
	fn: () => Promise<T> | T,
	options?: {
		finally?: () => void | Promise<void>;
	}
): Promise<[T | undefined, Error | undefined]> {
	try {
		const value = await fn();
		return [value, undefined];
	} catch (e) {
		return [undefined, toError(e)];
	} finally {
		if (options?.finally) await options.finally();
	}
}

function toError(e: unknown): Error {
	if (e instanceof Error) return e;
	try {
		return new Error(typeof e === 'string' ? e : JSON.stringify(e));
	} catch {
		return new Error(String(e));
	}
}
