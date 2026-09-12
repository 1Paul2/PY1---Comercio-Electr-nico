import { liteClient as algoliasearch } from 'algoliasearch/lite'

/**
 * Nombre: searchClient
 * Descripción: Crea el cliente de Algolia para consultar productos y filtros desde la app.
 * Entradas: No recibe parámetros.
 * Salidas: Instancia configurada del cliente de búsqueda.
 * Excepciones: No hay.
 */
export const searchClient = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
)