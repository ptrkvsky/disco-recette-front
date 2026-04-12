import type { SiteThemeHexes } from "./groq/site-config";

/** Clés `theme` Sanity → variables `--color-*` (alignées sur `@theme` dans global.css). */
const THEME_KEY_TO_CSS_VAR: Record<keyof SiteThemeHexes, string> = {
  page: "--color-page",
  surface: "--color-surface",
  foreground: "--color-foreground",
  muted: "--color-muted",
  border: "--color-border",
  badge: "--color-badge",
  badgeFg: "--color-badge-fg",
  link: "--color-link",
  accent: "--color-accent",
  accentOnSurface: "--color-accent-on-surface",
  accentFg: "--color-accent-fg",
  recipeBg: "--color-recipe-bg",
};

const HEX_RE = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

function isValidThemeHex(raw: string): boolean {
  return HEX_RE.test(raw.trim());
}

/** Retourne un `#rrggbb` sûr pour le CSS, ou `null` si invalide. */
function normalizeHexForCss(raw: string): string | null {
  const s = raw.trim();
  const m = s.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return `#${h.toLowerCase()}`;
}

/**
 * Produit un bloc `:root { … }` pour surcharger les tokens `@theme`, ou `null` si rien d’injectable.
 */
export function siteThemeToRootStyleBlock(
  theme: SiteThemeHexes | null | undefined,
): string | null {
  if (!theme) return null;

  const lines: string[] = [];
  for (const key of Object.keys(
    THEME_KEY_TO_CSS_VAR,
  ) as (keyof SiteThemeHexes)[]) {
    const raw = theme[key];
    if (typeof raw !== "string" || !isValidThemeHex(raw)) continue;
    const hex = normalizeHexForCss(raw);
    if (!hex) continue;
    const cssVar = THEME_KEY_TO_CSS_VAR[key];
    lines.push(`  ${cssVar}: ${hex};`);
  }

  if (lines.length === 0) return null;
  return `:root {\n${lines.join("\n")}\n}`;
}
