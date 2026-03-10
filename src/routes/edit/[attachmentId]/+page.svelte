<script lang="ts">
	import { CHEFS_SERVER_URL } from '$lib/constants';
	import type ChefsFormViewer from '$lib/types/chefs-web-component';
	import type { PageProps } from './$types';

	let { params, data }: PageProps = $props();
	let formViewer: ChefsFormViewer | null = null;

	$effect(() => {
		const form = formViewer;
		const logSubmit = (e: CustomEvent<unknown>) => {
			console.log("🚀 formio:submit", e.detail);
		}
		if (form) {
			form.addEventListener("formio:submitDone", logSubmit);
			form.formId = 'foo';
			form.endpoints = {
				mainCss: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/chefs-index.css',
				formioJs: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/formio.js',
				componentsJs: CHEFS_SERVER_URL + '/app/webcomponents/v1/form-viewer/components',
				themeCss: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/chefs-theme.css',
				iconsCss: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/font-awesome/css/font-awesome.min.css',
				schema: '/api/schema/:submissionId',
				readSubmission: '/api/attachment/:submissionId',
				submit: '/api/submit/:submissionId'
			};
			form.load();
		}
		return () => {
			if (form) {
				form.removeEventListener("formio:submitDone", logSubmit);
			}
		}
	});
</script>

<svelte:head>
	
</svelte:head>

<chefs-form-viewer
	bind:this={formViewer}
	isolate-styles
	submission-id={params.attachmentId}
></chefs-form-viewer>
