/** Liste : champs carte + image minimale pour le CDN. */
export const RECIPES_LIST_QUERY = `*[_type == "recette" && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  prepTimeMin,
  cookTimeMin,
  difficulty,
  mainImage {
    _type,
    alt,
    asset,
    hotspot,
    crop
  }
}`;

export const RECIPE_SLUGS_QUERY = `*[_type == "recette" && defined(slug.current)]{"slug": slug.current}`;

/** Détail complet pour la page recette. */
export const RECIPE_BY_SLUG_QUERY = `*[_type == "recette" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  excerpt,
  introduction,
  mainImage {
    _type,
    alt,
    asset,
    hotspot,
    crop
  },
  prepTimeMin,
  cookTimeMin,
  difficulty,
  baseServings,
  ingredients[]{ name, quantity, unit, note, optional },
  steps[]{ title, instruction },
  nutrition{
    note,
    caloriesKcal,
    carbohydrateG,
    proteinG,
    fatG,
    saturatedFatG,
    cholesterolMg,
    sodiumMg,
    potassiumMg,
    fiberG,
    sugarG,
    vitaminAIu,
    vitaminCMg,
    calciumMg,
    ironMg
  },
  tips,
  publishedAt
}`;
