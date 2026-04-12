/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SITE_URL?: string;
	readonly PUBLIC_RECIPE_AUTHOR_NAME?: string;
	readonly PUBLIC_SANITY_PROJECT_ID?: string;
	readonly PUBLIC_SANITY_DATASET?: string;
	readonly PUBLIC_SANITY_API_VERSION?: string;
	readonly SANITY_API_READ_TOKEN?: string;
	/** Alias pris en charge si `SANITY_API_READ_TOKEN` est absent (ex. même nom que le CLI Sanity). */
	readonly SANITY_API_TOKEN?: string;
	/** Langue d’interface du build : fr | de | it (défaut : fr) */
	readonly PUBLIC_LOCALE?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
