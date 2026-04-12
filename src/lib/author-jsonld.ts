import type { RecipeAuthorSocial } from '../types/recipe';

export function buildAuthorPersonJsonLd(input: {
	name: string;
	canonicalUrl: string;
	imageUrl?: string;
	social?: RecipeAuthorSocial | null;
}): { '@context': string; '@type': string; name: string; url: string; image?: string; sameAs?: string[] } {
	const sameAs = input.social
		? (Object.values(input.social).filter((u): u is string => typeof u === 'string' && u.trim().length > 0) as string[])
		: [];
	const out: {
		'@context': string;
		'@type': string;
		name: string;
		url: string;
		image?: string;
		sameAs?: string[];
	} = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: input.name,
		url: input.canonicalUrl,
	};
	if (input.imageUrl) out.image = input.imageUrl;
	if (sameAs.length) out.sameAs = sameAs;
	return out;
}
