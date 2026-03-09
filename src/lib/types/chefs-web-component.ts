/**
 * CHEFS Form Viewer Web Component
 * LLM generated; use with caution
 */

/**
 * Form object from CHEFS schema
 */
export interface Form {
	id?: string;
	name?: string;
	description?: string;
	title?: string;
	path?: string;
	type?: string;
	display?: string;
	components?: Record<string, unknown>[];
	versions?: FormVersion[];
	[key: string]: unknown;
}

/**
 * Form version containing schema
 */
export interface FormVersion {
	id?: string;
	version?: number;
	schema?: Record<string, unknown>;
	createdAt?: string;
	[key: string]: unknown;
}

/**
 * Form data/submission object
 */
export interface Submission {
	id?: string;
	data?: Record<string, unknown>;
	submission?: SubmissionNested;
	[key: string]: unknown;
}

interface SubmissionNested {
	data?: Record<string, unknown>;
	[key: string]: unknown;
}

/**
 * Host submission event detail
 */
export interface HostSubmitDetail {
	data: Record<string, unknown>;
	submission: Submission;
	formId: string;
	formName?: string | null;
	timestamp: string;
	isDraft: boolean;
	waitUntil?: (promise: Promise<unknown>) => void;
}

/**
 * Auth token refresh event detail
 */
export interface AuthTokenRefreshedDetail {
	authToken: string;
	oldToken: string;
}

/**
 * User token refresh event detail
 */
export interface UserTokenRefreshedDetail {
	expiresAt: number | null;
}

/**
 * User token expiring event detail
 */
export interface UserTokenExpiringDetail {
	expiresAt: number;
	expired: boolean;
}

/**
 * File upload event detail
 */
export interface FileUploadDetail {
	formData: FormData;
	config?: Record<string, unknown>;
	action: 'upload';
	waitUntil?: (promise: Promise<unknown>) => void;
}

/**
 * File download event detail
 */
export interface FileDownloadDetail {
	fileId: string;
	config?: Record<string, unknown>;
	action: 'download';
	waitUntil?: (promise: Promise<unknown>) => void;
}

/**
 * File delete event detail
 */
export interface FileDeleteDetail {
	fileInfo: Record<string, unknown>;
	fileId?: string;
	action: 'delete';
	waitUntil?: (promise: Promise<unknown>) => void;
}

/**
 * Endpoint configuration overrides
 */
export interface Endpoints {
	mainCss?: string;
	formioJs?: string;
	componentsJs?: string;
	themeCss?: string;
	iconsCss?: string;
	formioJsFallback?: string;
	iconsCssFallback?: string;
	schema?: string;
	submit?: string;
	readSubmission?: string;
	printSubmission?: string;
	printDraft?: string;
	files?: string;
	deleteFile?: string;
	getFile?: string;
	uploadFile?: string;
	bcgeoaddress?: string;
	[key: string]: string | undefined;
}

/**
 * Options for refreshing user token
 */
export interface RefreshUserTokenOptions {
	token: string;
	expiresAt?: number;
	buffer?: number;
}

/**
 * Options for setting host data
 */
export interface SetHostDataOptions {
	replace?: boolean;
}

/**
 * Print options
 */
export interface PrintOptions {
	submissionData?: Record<string, unknown>;
	payload?: Record<string, unknown>;
	[key: string]: unknown;
}

/**
 * Submission mode type
 */
export type SubmitMode = 'chefs' | 'host' | 'none';

/**
 * Auth header builder callback
 */
export type OnBuildAuthHeader = (url: string) => Record<string, string> | undefined;

/**
 * Passthrough headers builder callback
 */
export type OnPassthroughHeaders = (url: string) => Record<string, string> | undefined;

/**
 * Event map for ChefsFormViewer custom events
 */
interface ChefsFormViewerEventMap extends HTMLElementEventMap {
	'formio:ready': CustomEvent<unknown>;
	'formio:render': CustomEvent<unknown>;
	'formio:change': CustomEvent<unknown>;
	'formio:submit': CustomEvent<unknown>;
	'formio:submitDone': CustomEvent<unknown>;
	'formio:error': CustomEvent<unknown>;
	'formio:beforeSubmit': CustomEvent<unknown>;
	'formio:authTokenRefreshed': CustomEvent<AuthTokenRefreshedDetail>;
	'formio:userTokenRefreshed': CustomEvent<UserTokenRefreshedDetail>;
	'formio:userTokenExpiring': CustomEvent<UserTokenExpiringDetail>;
	'formio:hostSubmit': CustomEvent<HostSubmitDetail>;
}

/**
 * CHEFS Form Viewer custom element
 *
 * @example
 * const viewer = document.querySelector('chefs-form-viewer');
 * viewer.formId = '12345';
 * viewer.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....';
 * await viewer.load();
 */
export declare class ChefsFormViewer extends HTMLElement {
	// Configuration properties
	formId: string | null;
	authToken: string | null;
	apiKey: string | null;
	submissionId: string | null;
	readOnly: boolean;
	language: string;
	baseUrl?: string;
	submitButtonKey: string;
	printButtonKey: string;
	printEventName: string;
	themeCss: string | null;
	isolateStyles: boolean;
	noIcons: boolean;
	token: Record<string, unknown> | null;
	user: Record<string, unknown> | null;
	headers: Record<string, unknown> | null;
	hostData: Record<string, unknown> | null;
	autoReloadOnSubmit: boolean;
	submitMode: SubmitMode;
	endpoints: Endpoints | null;

	// State properties (read-only)
	form: Form;
	formSchema: Record<string, unknown>;
	formioInstance: Record<string, unknown> | null;
	formName: string | null;
	formDescription: string | null;
	formMetadata: Record<string, unknown> | null;
	userTokenExpiresAt: number | null;

	// Callbacks
	onBuildAuthHeader?: OnBuildAuthHeader;
	onPassthroughHeaders?: OnPassthroughHeaders;

	// Parsers
	parsers: {
		schema: (json: Record<string, unknown>) => {
			form: Form;
			schema: Record<string, unknown>;
		};
		readSubmission: (json: Record<string, unknown>) => { data: Record<string, unknown> | null };
		submitResult: (json: Record<string, unknown>) => { submission: Submission };
		error: (json: Record<string, unknown>) => string | null;
	};

	/**
	 * Loads the form schema and initializes the Form.io instance.
	 * @returns Promise that resolves when form is ready
	 * @throws Error if loading fails
	 */
	load(): Promise<void>;

	/**
	 * Reloads the form schema and re-initializes the Form.io instance.
	 * @returns Promise that resolves when reload completes
	 */
	reload(): Promise<void>;

	/**
	 * Destroys the Form.io instance and cleans up resources.
	 * @returns Promise that resolves when cleanup is complete
	 */
	destroy(): Promise<void>;

	/**
	 * Programmatically submits the form data to the backend.
	 * @returns Promise that resolves when submission completes
	 */
	submit(): Promise<void>;

	/**
	 * Saves the form data as a draft (not final submission).
	 * @returns Promise that resolves when draft save completes
	 */
	draft(): Promise<void>;

	/**
	 * Programmatically triggers print using direct print configuration.
	 * @param options Optional print configuration
	 * @returns Promise that resolves when print completes
	 */
	print(options?: PrintOptions): Promise<void>;

	/**
	 * Sets the form data programmatically (pre-fills the form).
	 * @param data The data object to populate the form with
	 */
	setSubmission(data: Record<string, unknown>): void;

	/**
	 * Gets the current form data from the Form.io instance.
	 * @returns Current form submission or null if not initialized
	 */
	getSubmission(): Submission | null;

	/**
	 * Refreshes the authentication token by POSTing to the backend refresh endpoint.
	 * @returns Promise that resolves when refresh completes
	 */
	refreshAuthToken(): Promise<void>;

	/**
	 * Updates user Authorization header and schedules refresh notification.
	 * @param options Token refresh options
	 */
	refreshUserToken(options: RefreshUserTokenOptions): void;

	/**
	 * Sets arbitrary host application data available in Form.io's evalContext.
	 * @param data The data object to add/merge
	 * @param options Configuration options
	 */
	setHostData(data: Record<string, unknown>, options?: SetHostDataOptions): void;

	/**
	 * Gets the current host data object.
	 * @returns Copy of current hostData or null if not set
	 */
	getHostData(): Record<string, unknown> | null;

	/**
	 * Gets the component's base URL.
	 * @returns Resolved base URL
	 */
	getBaseUrl(): string;

	/**
	 * Typed addEventListener for ChefsFormViewer custom events
	 */
	addEventListener<K extends keyof ChefsFormViewerEventMap>(
		type: K,
		listener: (this: ChefsFormViewer, ev: ChefsFormViewerEventMap[K]) => void,
		options?: boolean | AddEventListenerOptions
	): void;

	/**
	 * Typed removeEventListener for ChefsFormViewer custom events
	 */
	removeEventListener<K extends keyof ChefsFormViewerEventMap>(
		type: K,
		listener: (this: ChefsFormViewer, ev: ChefsFormViewerEventMap[K]) => void,
		options?: boolean | EventListenerOptions
	): void;
}

declare global {
	interface Window {
		ChefsFormViewer: typeof ChefsFormViewer;
		CHEFS_VIEWER_DEBUG?: boolean;
		FormViewerUtils: Record<string, unknown>;
	}
}

export default ChefsFormViewer;
