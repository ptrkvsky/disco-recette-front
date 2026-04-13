import { absoluteSiteUrl } from './absolute-site-url';
import { RECIPE_SHARE_IMAGE_WIDTH, urlForRecipeImage } from './sanity-image';
import type { RecipeMainImage } from '../types/recipe';

/** PUBLIC_SITE_NAME puis titre `siteConfig`, puis libellé i18n. */
export function resolveSiteName(
	envName: string | undefined,
	cmsTitle: string | null | undefined,
	fallback: string,
): string {
	const e = envName?.trim();
	if (e) return e;
	const c = cmsTitle?.trim();
	if (c) return c;
	return fallback;
}

/** PUBLIC_SITE_LOGO_URL puis logo Sanity (CDN image-url). */
export function resolveSiteLogoUrl(
	siteOrigin: string,
	envLogoUrl: string | undefined,
	cmsLogo: RecipeMainImage,
	opts?: { width?: number; height?: number },
): string | undefined {
	const fromEnv = absoluteSiteUrl(siteOrigin, envLogoUrl);
	if (fromEnv) return fromEnv;
	if (!cmsLogo) return undefined;
	const width = opts?.width ?? RECIPE_SHARE_IMAGE_WIDTH;
	const height = opts?.height;
	return height != null
		? urlForRecipeImage(cmsLogo, { width, height })
		: urlForRecipeImage(cmsLogo, { width });
}
