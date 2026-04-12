import type { PortableTextBlock } from '@portabletext/types';

import type { RecipeAuthorSocial, RecipeListItem, RecipeMainImage } from './recipe';

export type AuthorSlugRow = { slug: string };

/** Données page auteur (projections GROQ auteur). */
export type AuthorWithRecipes = {
	_id?: string;
	name: string;
	slug?: string | null;
	bio?: PortableTextBlock[] | null;
	social?: RecipeAuthorSocial | null;
	image?: RecipeMainImage;
	recipes?: RecipeListItem[] | null;
};
