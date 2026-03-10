# CHEFS webcomponent + kiln-api

Proof of concept demonstrating opening form attachment data from ICM in the CHEFS web component.

## Developing

Requires running kiln-api and Communication-Layer locally, set up to authenticate and pull data from an ICM environment.

```sh
cp .env.example .env
# change LOAD_BOUND_FORM_ENDPOINT_URL if needed
npm install
npm run dev
```

## Usage
Currently depends on a hard-coded form.io schema `src/lib/custom-form.json` to match a few fields from an existing FF schema (HR3472)

1. Create an attachment using template HR3472 on ICM, generate/save it, get the attachmentId.
2. Go to `http://localhost:5174/edit/[attachmentId]`
