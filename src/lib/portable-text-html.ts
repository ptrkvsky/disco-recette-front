import { toHTML } from '@portabletext/to-html';
import type { PortableTextBlock } from '@portabletext/types';

/** Convertit la bio auteur (Portable Text Sanity) en HTML sûr pour `set:html`. */
export function portableTextToHtml(blocks: PortableTextBlock[] | null | undefined): string {
	if (!Array.isArray(blocks) || blocks.length === 0) return '';
	return toHTML(blocks);
}
