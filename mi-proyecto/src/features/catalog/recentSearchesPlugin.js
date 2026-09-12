import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'

/**
 * Nombre: recentSearchesPlugin
 * Descripción: Guarda y recupera búsquedas recientes del usuario en localStorage.
 * Entradas: No recibe parámetros.
 * Salidas: Plugin configurado para el autocompletado.
 * Excepciones: No hay.
 */
export const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'grupo07-recent-searches',
  limit: 5,
})