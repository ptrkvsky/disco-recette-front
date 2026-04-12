export const APP_LOCALES = ['fr', 'de', 'it'] as const;
export type AppLocale = (typeof APP_LOCALES)[number];

const INTL_TAG: Record<AppLocale, string> = {
	fr: 'fr-FR',
	de: 'de-DE',
	it: 'it-IT',
};

export function getActiveLocale(): AppLocale {
	const raw = import.meta.env.PUBLIC_LOCALE?.toLowerCase().trim();
	if (raw === 'fr' || raw === 'de' || raw === 'it') return raw;
	return 'fr';
}

export function intlLocaleTag(locale: AppLocale): string {
	return INTL_TAG[locale];
}
