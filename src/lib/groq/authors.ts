/** Projection partagée : champs auteur + liste des recettes liées. */
const authorPageProjection = `
  _id,
  name,
  "slug": slug.current,
  bio,
  social,
  image {
    _type,
    alt,
    asset,
    hotspot,
    crop
  },
  "recipes": *[_type == "recette" && author._ref == ^._id && defined(slug.current)] | order(coalesce(publishedAt, _updatedAt) desc) {
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
  }
`;

/** Slugs pour `getStaticPaths` des pages auteur (URLs canoniques). */
export const AUTHOR_SLUGS_QUERY = `*[_type == "author" && defined(slug.current)]{"slug": slug.current}`;

/** Identifiants document pour `/auteurs/by-id/...` (repli sans slug). */
export const AUTHOR_IDS_QUERY = `*[_type == "author"]._id`;

/** Page auteur par slug. */
export const AUTHOR_PAGE_QUERY = `*[_type == "author" && slug.current == $slug][0]{${authorPageProjection}}`;

/** Page auteur par `_id` Sanity. */
export const AUTHOR_PAGE_BY_ID_QUERY = `*[_type == "author" && _id == $id][0]{${authorPageProjection}}`;
