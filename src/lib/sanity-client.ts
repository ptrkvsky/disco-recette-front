import { createClient, type SanityClient } from '@sanity/client';

const projectId =
	import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '5d2il4tb';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion =
	import.meta.env.PUBLIC_SANITY_API_VERSION ?? '2024-01-01';

const token =
	import.meta.env.SANITY_API_READ_TOKEN ?? import.meta.env.SANITY_API_TOKEN;

export const sanityClient: SanityClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: !token,
	...(token ? { token } : {}),
});
