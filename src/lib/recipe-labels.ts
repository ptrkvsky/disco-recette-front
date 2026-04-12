import type { MessageKey } from '../i18n/t';
import { t } from '../i18n/t';
import type { RecipeDifficulty } from '../types/recipe';

const difficultyKeys: Record<RecipeDifficulty, MessageKey> = {
	easy: 'difficulty.easy',
	medium: 'difficulty.medium',
	hard: 'difficulty.hard',
};

export function labelDifficulty(
	value: RecipeDifficulty | null | undefined,
): string {
	if (!value) return t('serving.emDash');
	return t(difficultyKeys[value]);
}

export function nutritionFieldLabel(fieldKey: string): string {
	return t(`nutrition.${fieldKey}` as MessageKey);
}
