import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { sanityClient } from './sanity-client';

const builder = createImageUrlBuilder(sanityClient);

export type RecipeImageSource = SanityImageSource | null | undefined;

/**
 * URL optimisée pour une image recette (hotspot/crop pris en charge par le builder si présents sur la source).
 */
export function urlForRecipeImage(
	source: RecipeImageSource,
	opts: { width: number; height?: number },
): string | undefined {
	if (!source) return undefined;
	let img = builder.image(source).auto('format').width(opts.width);
	if (opts.height != null) {
		img = img.height(opts.height).fit('crop');
	}
	return img.url();
}
