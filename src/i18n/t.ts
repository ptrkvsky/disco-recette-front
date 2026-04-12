import type { AppLocale } from './locale';
import { getActiveLocale } from './locale';
import de from './messages/de.json';
import fr from './messages/fr.json';
import it from './messages/it.json';

export type MessageKey = keyof typeof fr;

const byLocale: Record<AppLocale, Record<MessageKey, string>> = {
	fr,
	de: de as Record<MessageKey, string>,
	it: it as Record<MessageKey, string>,
};

function applyReplacements(
	template: string,
	replacements?: Record<string, string | number>,
): string {
	if (!replacements) return template;
	let out = template;
	for (const [k, v] of Object.entries(replacements)) {
		out = out.replaceAll(`{${k}}`, String(v));
	}
	return out;
}

export function t(
	key: MessageKey,
	replacements?: Record<string, string | number>,
	locale?: AppLocale,
): string {
	const loc = locale ?? getActiveLocale();
	const raw = byLocale[loc][key] ?? byLocale.fr[key] ?? key;
	return applyReplacements(raw, replacements);
}

/** Message brute avec placeholders `{cle}` non remplacés (ex. logique client). */
export function rawMessage(key: MessageKey, locale?: AppLocale): string {
	const loc = locale ?? getActiveLocale();
	return byLocale[loc][key] ?? byLocale.fr[key] ?? key;
}
