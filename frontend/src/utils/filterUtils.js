export function normalizeStr(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Smart, fuzzy category matching that connects variations like
 * 'sofas', 'Sofa Sets', 'living', 'Dining Tables', 'dining', etc.
 */
export function matchCategory(productCat, filterCat) {
  if (!filterCat || filterCat === 'All' || filterCat === 'all' || filterCat === 'All Items' || filterCat === 'All Showcase') {
    return true;
  }
  if (!productCat) return false;

  const p = normalizeStr(productCat);
  const f = normalizeStr(filterCat);

  if (p === f) return true;

  // Semantic category aliases
  if ((f.includes('sofa') || f === 'living') && (p.includes('sofa') || p.includes('living'))) return true;
  if ((f.includes('bed') || f === 'bedroom') && (p.includes('bed') || p.includes('bedroom'))) return true;
  if (f.includes('dining') && p.includes('dining')) return true;
  if (f.includes('office') && p.includes('office')) return true;
  if (f.includes('wardrobe') && (p.includes('wardrobe') || p.includes('storage') || p.includes('closet'))) return true;
  if ((f.includes('table') || f.includes('center')) && (p.includes('table') || p.includes('center'))) return true;
  if (f.includes('chair') && p.includes('chair')) return true;
  if (f.includes('tv') && (p.includes('tv') || p.includes('unit') || p.includes('console'))) return true;
  if (f.includes('modular') && p.includes('modular')) return true;
  if (f.includes('storage') && (p.includes('storage') || p.includes('cabinet') || p.includes('wardrobe'))) return true;
  if (f.includes('decor') && p.includes('decor')) return true;

  return p.includes(f) || f.includes(p);
}

/**
 * Safe, null-tolerant full-text search across product fields
 */
export function matchSearch(product, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) return true;
  const q = searchQuery.toLowerCase().trim();

  const name = (product?.name || '').toLowerCase();
  const id = (product?.id || '').toLowerCase();
  const desc = (product?.description || '').toLowerCase();
  const cat = (product?.category || '').toLowerCase();
  const mat = (product?.material || '').toLowerCase();
  const tag = (product?.tag || '').toLowerCase();
  const badge = (product?.badge || '').toLowerCase();
  const price = (product?.price || '').toLowerCase();

  return (
    name.includes(q) ||
    id.includes(q) ||
    desc.includes(q) ||
    cat.includes(q) ||
    mat.includes(q) ||
    tag.includes(q) ||
    badge.includes(q) ||
    price.includes(q)
  );
}
