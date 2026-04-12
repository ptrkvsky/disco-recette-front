/** Thème : hex Sanity (`type: 'color'`) projetés pour override des variables CSS. */
export type SiteThemeHexes = {
	page?: string | null;
	surface?: string | null;
	foreground?: string | null;
	muted?: string | null;
	border?: string | null;
	badge?: string | null;
	badgeFg?: string | null;
	link?: string | null;
	accent?: string | null;
	accentOnSurface?: string | null;
	accentFg?: string | null;
	recipeBg?: string | null;
};

export type SiteConfigThemeRow = {
	theme: SiteThemeHexes | null;
} | null;

/** Singleton Studio : documentId fixe `siteConfig`. */
export const SITE_CONFIG_THEME_QUERY = `*[_id == "siteConfig"][0]{
  theme {
    "page": page.hex,
    "surface": surface.hex,
    "foreground": foreground.hex,
    "muted": muted.hex,
    "border": border.hex,
    "badge": badge.hex,
    "badgeFg": badgeFg.hex,
    "link": link.hex,
    "accent": accent.hex,
    "accentOnSurface": accentOnSurface.hex,
    "accentFg": accentFg.hex,
    "recipeBg": recipeBg.hex
  }
}`;
