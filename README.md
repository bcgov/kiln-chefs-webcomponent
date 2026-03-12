# CHEFS webcomponent + kiln-api

Proof of concept demonstrating opening form attachment data from ICM in the CHEFS web component.

## Getting started

Requires running kiln-api and Communication-Layer locally, set up to authenticate and pull data from an ICM environment.

### Set up environment

1. `cp .env.example .env`
2. Update `PUBLIC_BASE_URL`, `VITE_PORT`, and `BETTER_AUTH_URL` (same as PUBLIC_BASE_URL) if needed.
3. Update `KILN_LOAD_BOUND_FORM_ENDPOINT` and `KILN_SAVE_FORM_DATA_ENDPOINT` base urls if needed.
4. Fill in `KEYCLOAK_*` with the same credentials that your Communication_Layer instance is using. `KEYCLOAK_ISSUER` is typically `${KEYCLOAK_SERVER_URL}/realms/${KEYCLOAK_REALM_NAME}`
5. Generate a secret key for BETTER_AUTH_SECRET (ex: `openssl rand -base64 32`)

### Install and run:

```sh
npm install
npm run dev
```

## Usage

Currently depends on a hard-coded form.io schema `src/lib/custom-form.json` to match a few fields from an existing FF schema (HR3472)

1. Create an attachment using template HR3472 on ICM, generate/save it, get the attachmentId.
2. Go to `http://localhost:5174/edit/[attachmentId]`
