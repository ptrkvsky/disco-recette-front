export type RecipeDifficulty = 'easy' | 'medium' | 'hard';

/** Projection `mainImage` pour @sanity/image-url (référence d’asset + hotspot/crop). */
export type RecipeMainImage = {
	_type?: string | null;
	alt?: string | null;
	asset?: { _ref: string; _type?: string } | null;
	hotspot?: Record<string, unknown> | null;
	crop?: Record<string, unknown> | null;
} | null;

export type RecipeListItem = {
	title: string;
	slug: string;
	excerpt?: string | null;
	publishedAt?: string | null;
	prepTimeMin?: number | null;
	cookTimeMin?: number | null;
	difficulty?: RecipeDifficulty | null;
	mainImage?: RecipeMainImage;
};

export type RecipeIngredient = {
	name: string;
	quantity?: number | null;
	unit?: string | null;
	note?: string | null;
	optional?: boolean | null;
};

export type RecipeStep = {
	title?: string | null;
	instruction: string;
};

export type RecipeNutrition = {
	note?: string | null;
	caloriesKcal?: number | null;
	carbohydrateG?: number | null;
	proteinG?: number | null;
	fatG?: number | null;
	saturatedFatG?: number | null;
	cholesterolMg?: number | null;
	sodiumMg?: number | null;
	potassiumMg?: number | null;
	fiberG?: number | null;
	sugarG?: number | null;
	vitaminAIu?: number | null;
	vitaminCMg?: number | null;
	calciumMg?: number | null;
	ironMg?: number | null;
};

export type RecipeDetail = RecipeListItem & {
	introduction?: string | null;
	baseServings: number;
	ingredients?: RecipeIngredient[] | null;
	steps?: RecipeStep[] | null;
	nutrition?: RecipeNutrition | null;
	tips?: string | null;
};

export type RecipeSlugRow = { slug: string };
