import type { IconName } from '@/components/Icon'
import type { placePhotos } from './assets'

export type PlaceCatalogEntry = {
  id: string
  name: string
  /** "Cosy tasca · €€ · 6 min walk" */
  line: string
  /** Only the three the scenario actually photographed. Every other search
   *  result falls back to an icon tile — see `Icon`'s `name` below, reused
   *  as the tile's centered glyph instead of a small corner badge. */
  photo?: keyof typeof placePhotos
  icon: IconName
}

/**
 * Every place "Add a place" can search — the three the poll starts with
 * (with real photography) plus a wider set of nearby mock results with icon
 * fallbacks (docs/INTERACTION_EXECUTION_BRIEF.md §1: no new photo assets,
 * so places without a `placePhotos` entry render a tile icon instead of an
 * image). Order here is the "Nearby" order shown before typing.
 */
export const placesCatalog: PlaceCatalogEntry[] = [
  { id: 'taberna', name: 'Taberna da Rua das Flores', line: 'Cosy tasca · €€ · 6 min walk', photo: 'taberna', icon: 'bowl' },
  { id: 'timeout', name: 'Time Out Market', line: 'Buzzy food hall · € · 11 min walk', photo: 'timeout', icon: 'fork-knife' },
  { id: 'ramiro', name: 'Cervejaria Ramiro', line: 'Seafood feast · €€€ · 9 min by tram', photo: 'ramiro', icon: 'fish' },
  { id: 'padaria-sao-roque', name: 'Padaria São Roque', line: 'Bakery & light bites · € · 4 min walk', icon: 'bread' },
  { id: 'vinho-e-amigos', name: 'Vinho & Amigos', line: 'Wine bar & snacks · €€ · 5 min walk', icon: 'wine' },
  { id: 'cantina-do-bairro', name: 'Cantina do Bairro', line: 'Home-style Portuguese · € · 7 min walk', icon: 'bowl' },
  { id: 'pizzaria-alfama', name: 'Pizzaria Alfama', line: 'Wood-fired pizza · € · 8 min walk', icon: 'bowl' },
  { id: 'petisqueira-do-bairro', name: 'Petisqueira do Bairro', line: 'Small plates · €€ · 14 min walk', icon: 'bread' },
  { id: 'marisqueira-central', name: 'Marisqueira Central', line: 'Fresh shellfish · €€€ · 10 min by tram', icon: 'fish' },
  { id: 'a-tasquinha', name: 'A Tasquinha', line: 'Grilled fish · €€ · 9 min walk', icon: 'fish' },
]

export function searchPlaces(query: string): PlaceCatalogEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return placesCatalog
  return placesCatalog.filter((p) => p.name.toLowerCase().includes(q) || p.line.toLowerCase().includes(q))
}
