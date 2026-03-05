<script lang="ts">
	import { CHEFS_SERVER_URL } from '$lib/constants';
	import type ChefsFormViewer from '$lib/types/chefs-web-component';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let formViewer: ChefsFormViewer | null = null;

	$effect(() => {
		if (formViewer) {
			formViewer.authToken = data.token;
			formViewer.formId = data.formId;
			formViewer.endpoints = {
				mainCss: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/chefs-index.css',
				formioJs: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/formio.js',
				componentsJs: CHEFS_SERVER_URL + '/app/webcomponents/v1/form-viewer/components',
				themeCss: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/chefs-theme.css',
				iconsCss: CHEFS_SERVER_URL + '/app/webcomponents/v1/assets/font-awesome/css/font-awesome.min.css',
				// schema: '/api/schema/:formId',
				readSubmission: '/api/attachment/:submissionId',
			}
			formViewer.load();
		}
	});
</script>

<svelte:head>
	
</svelte:head>

<chefs-form-viewer
	bind:this={formViewer}
	isolate-styles
	submission-id="1-5DFWNFH"
></chefs-form-viewer>
