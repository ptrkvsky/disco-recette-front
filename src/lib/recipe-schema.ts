import { t } from '../i18n/t';
import { labelDifficulty } from './recipe-labels';
import type {
	RecipeDetail,
	RecipeIngredient,
	RecipeNutrition,
	RecipeStep,
} from '../types/recipe';

export type RecipeSchemaGraph = {
	'@context': 'https://schema.org';
	'@graph': Record<string, unknown>[];
};

function minutesToIsoDuration(min: number | null | undefined): string | undefined {
	if (min == null || !Number.isFinite(min) || min <= 0) return undefined;
	return `PT${Math.round(min)}M`;
}

function formatIngredientLine(ing: RecipeIngredient): string {
	const qty =
		ing.quantity != null && Number.isFinite(ing.quantity)
			? String(ing.quantity).replace('.', ',')
			: '';
	const unit = ing.unit?.trim() ?? '';
	const name = ing.name?.trim() ?? '';
	const core = [qty, unit, name].filter(Boolean).join(' ').trim();
	let line = core || name;
	if (ing.note?.trim()) {
		line = line ? `${line} (${ing.note.trim()})` : ing.note.trim();
	}
	if (ing.optional) {
		line = line
			? `${line}${t('schema.ingredientOptionalSuffix')}`
			: t('schema.ingredientOptionalOnly');
	}
	return line;
}

function recipeDescription(recipe: RecipeDetail): string | undefined {
	const excerpt = recipe.excerpt?.trim();
	if (excerpt) return excerpt;
	const intro = recipe.introduction?.trim();
	if (!intro) return undefined;
	const collapsed = intro.replace(/\s+/g, ' ');
	return collapsed.length > 320 ? `${collapsed.slice(0, 317)}…` : collapsed;
}

function nutritionBlock(n: RecipeNutrition): Record<string, unknown> | undefined {
	const out: Record<string, unknown> = {
		'@type': 'NutritionInformation',
	};

	if (n.caloriesKcal != null && Number.isFinite(n.caloriesKcal)) {
		out.calories = `${Math.round(n.caloriesKcal)} kcal`;
	}
	const g = (v: number | null | undefined) =>
		v != null && Number.isFinite(v) ? `${v} g` : undefined;
	const mg = (v: number | null | undefined) =>
		v != null && Number.isFinite(v) ? `${v} mg` : undefined;

	const carb = g(n.carbohydrateG);
	if (carb) out.carbohydrateContent = carb;
	const prot = g(n.proteinG);
	if (prot) out.proteinContent = prot;
	const fat = g(n.fatG);
	if (fat) out.fatContent = fat;
	const sat = g(n.saturatedFatG);
	if (sat) out.saturatedFatContent = sat;
	const chol = mg(n.cholesterolMg);
	if (chol) out.cholesterolContent = chol;
	const sod = mg(n.sodiumMg);
	if (sod) out.sodiumContent = sod;
	const fib = g(n.fiberG);
	if (fib) out.fiberContent = fib;
	const sug = g(n.sugarG);
	if (sug) out.sugarContent = sug;

	const keys = Object.keys(out).filter((k) => k !== '@type');
	if (keys.length === 0) return undefined;
	return out;
}

function stripDeep(value: unknown): unknown {
	if (value === null || value === undefined) return undefined;
	if (Array.isArray(value)) {
		const arr = value
			.map((item) => stripDeep(item))
			.filter((item) => item !== undefined && item !== null);
		return arr.length ? arr : undefined;
	}
	if (typeof value === 'object') {
		const obj = value as Record<string, unknown>;
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(obj)) {
			const cleaned = stripDeep(v);
			if (cleaned !== undefined && cleaned !== null) {
				if (
					typeof cleaned === 'object' &&
					!Array.isArray(cleaned) &&
					Object.keys(cleaned as Record<string, unknown>).length === 0
				) {
					continue;
				}
				out[k] = cleaned;
			}
		}
		return Object.keys(out).length ? out : undefined;
	}
	return value;
}

export function buildRecipeSchemaGraph(input: {
	recipe: RecipeDetail;
	canonicalUrl: string;
	imageUrls: string[];
	authorName?: string;
}): RecipeSchemaGraph {
	const { recipe, canonicalUrl, imageUrls } = input;
	const authorName = input.authorName?.trim() || t('author.defaultName');
	const recipeId = `${canonicalUrl}#recipe`;
	const breadcrumbId = `${canonicalUrl}#breadcrumb`;
	const origin = new URL(canonicalUrl).origin;

	const prepTime = minutesToIsoDuration(recipe.prepTimeMin);
	const cookTime = minutesToIsoDuration(recipe.cookTimeMin);
	const prep = recipe.prepTimeMin ?? 0;
	const cook = recipe.cookTimeMin ?? 0;
	const totalMin = prep + cook;
	const totalTime =
		totalMin > 0 ? minutesToIsoDuration(totalMin) : undefined;

	const ingredients = (recipe.ingredients ?? [])
		.map(formatIngredientLine)
		.filter(Boolean);

	const steps = (recipe.steps ?? []).map((step: RecipeStep, i: number) => {
		const text = step.instruction?.trim();
		if (!text) return undefined;
		const stepObj: Record<string, unknown> = {
			'@type': 'HowToStep',
			position: i + 1,
			text,
		};
		const title = step.title?.trim();
		if (title) stepObj.name = title;
		return stepObj;
	}).filter(Boolean) as Record<string, unknown>[];

	const nutrition = recipe.nutrition
		? nutritionBlock(recipe.nutrition)
		: undefined;

	const difficultyLabel = labelDifficulty(recipe.difficulty);
	const keywordsParts = [recipe.title];
	if (recipe.difficulty && difficultyLabel !== t('serving.emDash')) {
		keywordsParts.push(difficultyLabel);
	}
	const keywords = keywordsParts.join(', ');

	const recipeNode: Record<string, unknown> = {
		'@type': 'Recipe',
		'@id': recipeId,
		url: canonicalUrl,
		name: recipe.title,
		author: {
			'@type': 'Person',
			name: authorName,
		},
		recipeYield:
			recipe.baseServings === 1
				? t('schema.recipeYieldSingular')
				: t('schema.recipeYieldPlural', { n: recipe.baseServings }),
		keywords,
	};

	const desc = recipeDescription(recipe);
	if (desc) recipeNode.description = desc;

	if (imageUrls.length) {
		recipeNode.image = imageUrls;
	}

	if (recipe.publishedAt) {
		recipeNode.datePublished = recipe.publishedAt;
	}

	if (prepTime) recipeNode.prepTime = prepTime;
	if (cookTime) recipeNode.cookTime = cookTime;
	if (totalTime) recipeNode.totalTime = totalTime;

	if (ingredients.length) {
		recipeNode.recipeIngredient = ingredients;
	}
	if (steps.length) {
		recipeNode.recipeInstructions = steps;
	}
	if (nutrition) {
		recipeNode.nutrition = nutrition;
	}

	const breadcrumb: Record<string, unknown> = {
		'@type': 'BreadcrumbList',
		'@id': breadcrumbId,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: t('schema.breadcrumbHome'),
				item: `${origin}/`,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: recipe.title,
				item: canonicalUrl,
			},
		],
	};

	const graph = [recipeNode, breadcrumb].map(
		(node) => stripDeep(node) as Record<string, unknown>,
	);

	return {
		'@context': 'https://schema.org',
		'@graph': graph,
	};
}
