import type { RecipeDifficulty } from '../types/recipe';

const difficultyLabels: Record<RecipeDifficulty, string> = {
	easy: 'Facile',
	medium: 'Moyen',
	hard: 'Difficile',
};

export function labelDifficulty(
	value: RecipeDifficulty | null | undefined,
): string {
	if (!value) return '—';
	return difficultyLabels[value] ?? value;
}

export const nutritionFieldLabels: Record<string, string> = {
	caloriesKcal: 'Calories (kcal)',
	carbohydrateG: 'Glucides (g)',
	proteinG: 'Protéines (g)',
	fatG: 'Lipides (g)',
	saturatedFatG: 'Dont saturés (g)',
	cholesterolMg: 'Cholestérol (mg)',
	sodiumMg: 'Sodium (mg)',
	potassiumMg: 'Potassium (mg)',
	fiberG: 'Fibres (g)',
	sugarG: 'Sucres (g)',
	vitaminAIu: 'Vitamine A (UI)',
	vitaminCMg: 'Vitamine C (mg)',
	calciumMg: 'Calcium (mg)',
	ironMg: 'Fer (mg)',
};
