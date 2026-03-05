import { browser } from '$app/environment';

export default function getCookie(name: string): string | null {
	if (!browser) return null;
	const match = document.cookie.match(
		new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
	);
	return match ? decodeURIComponent(match[1]) : null;
}
