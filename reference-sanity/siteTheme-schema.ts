/**
 * À copier dans votre projet Sanity Studio (ex. schemas/siteTheme.ts),
 * puis importer dans le tableau `schema.types` de sanity.config.ts.
 *
 * Chaque champ est un hex #RRGGBB (recommandé pour le pont CSS côté Astro).
 * Option UX : remplacer `type: 'string'` par le type `color` du plugin
 * @sanity/color-input et lire `.hex` dans la requête GROQ.
 */
import { defineField, defineType } from 'sanity';

const hexRule = (Rule: import('sanity').Rule) =>
	Rule.required().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, {
		name: 'hex',
		invert: false,
	}).error('Utiliser un hex valide : #RGB ou #RRGGBB');

export default defineType({
	name: 'siteTheme',
	title: 'Thème (couleurs)',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Titre interne',
			type: 'string',
			initialValue: 'Thème du site',
			readOnly: true,
			hidden: true,
		}),
		defineField({
			name: 'page',
			title: 'Fond page (--theme-page)',
			type: 'string',
			validation: hexRule,
			initialValue: '#f9f7f4',
		}),
		defineField({
			name: 'surface',
			title: 'Surface / body (--theme-surface)',
			type: 'string',
			validation: hexRule,
			initialValue: '#fffefb',
		}),
		defineField({
			name: 'foreground',
			title: 'Texte principal (--theme-foreground)',
			type: 'string',
			validation: hexRule,
			initialValue: '#1a1814',
		}),
		defineField({
			name: 'muted',
			title: 'Texte secondaire (--theme-muted)',
			type: 'string',
			validation: hexRule,
			initialValue: '#5c574e',
		}),
		defineField({
			name: 'border',
			title: 'Bordures (--theme-border)',
			type: 'string',
			validation: hexRule,
			initialValue: '#d8d2c6',
		}),
		defineField({
			name: 'badge',
			title: 'Fond badge (--theme-badge)',
			type: 'string',
			validation: hexRule,
			initialValue: '#ebe6dc',
		}),
		defineField({
			name: 'badgeFg',
			title: 'Texte badge (--theme-badge-fg)',
			type: 'string',
			validation: hexRule,
			initialValue: '#3d392f',
		}),
		defineField({
			name: 'link',
			title: 'Liens (--theme-link)',
			type: 'string',
			validation: hexRule,
			initialValue: '#2f6f62',
		}),
		defineField({
			name: 'accent',
			title: 'Accent (--theme-accent)',
			type: 'string',
			validation: hexRule,
			initialValue: '#6b7c4e',
		}),
		defineField({
			name: 'accentOnSurface',
			title: 'Accent sur fond clair (--theme-accent-on-surface)',
			description: 'Texte / icônes sur fonds clairs — viser contraste AA',
			type: 'string',
			validation: hexRule,
			initialValue: '#4a5a38',
		}),
		defineField({
			name: 'accentFg',
			title: 'Texte sur accent plein (--theme-accent-fg)',
			type: 'string',
			validation: hexRule,
			initialValue: '#ffffff',
		}),
		defineField({
			name: 'recipeBg',
			title: 'Fond zone recette (--theme-recipe-bg)',
			type: 'string',
			validation: hexRule,
			initialValue: '#faf8f3',
		}),
	],
	preview: {
		select: { accent: 'accent' },
		prepare({ accent }: { accent?: string }) {
			return {
				title: 'Thème du site',
				subtitle: accent ?? '',
			};
		},
	},
});
