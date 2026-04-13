/**
 * Résout une URL publique (env ou chemin /…) en URL absolue par rapport à l’origine du site.
 */
export function absoluteSiteUrl(
	siteOrigin: string,
	raw: string | undefined,
): string | undefined {
	const t = raw?.trim();
	if (!t) return undefined;
	if (t.startsWith('http://') || t.startsWith('https://')) return t;
	const origin = siteOrigin.replace(/\/$/, '');
	if (t.startsWith('/')) return `${origin}${t}`;
	return `${origin}/${t}`;
}
