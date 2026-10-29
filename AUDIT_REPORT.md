# SkyVortex Portfolio — Audit Report

## Changes made

- Prevented missing Supabase environment variables from crashing the entire React app at module import. A warning is shown and backend functionality remains unavailable until configured.
- Hardened login error handling and loading-state cleanup; profile role lookup uses `maybeSingle()` and non-admin sessions are signed out.
- Added an explicit loading state and safe denial path to `ProtectedRoute`, including handling request failures and component unmounts.
- Fixed the comment photo upload path so the bucket name is not duplicated inside the object path.
- Added error handling for project image upload and project create/update actions; filenames are sanitized.
- Added file type and 5 MB size checks, upload error handling, and object URL cleanup for certificate uploads.
- Made cached project/certificate JSON parsing tolerant of corrupted `localStorage` values.
- Documented the critical requirement for database and Storage RLS policies.

## Checks performed

- Confirmed `package.json` and the root dependency declarations in `package-lock.json` match.
- Scanned project text files for common embedded credential patterns; no credential-shaped token was found. A `service_role` mention in README is documentation only.
- Reviewed the deployment rewrite configuration and `.gitignore` for `.env` exclusion.

## Not verified

A production build and ESLint run could not be completed in this environment. Installing dependencies from npm failed because the registry could not be resolved (`EAI_AGAIN`), leaving an incomplete `node_modules` directory. Do not interpret this package as build-tested. Run `npm ci` and `npm run build` in Termux or CI with internet access before deployment.

## Security limitation

The React admin route is only a user-interface guard. Real authorization must be enforced by Supabase Row Level Security and Storage policies. Never expose a Supabase `service_role` or secret key in browser code or any `VITE_*` variable.
