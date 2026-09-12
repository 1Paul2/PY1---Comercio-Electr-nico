import { useEffect, useRef, useState } from 'react'
import { searchClient } from './searchClient'
import ProductCard from './ProductCard'
import '../../styles/RelatedProducts.css'

const INDEX_NAME = 'grupo-07_products'
const RELATED_LIMIT = 12

/**
 * Nombre: escapeFilterValue
 * Descripción: Escapa comillas dobles dentro de un valor de filtro para consultas de Algolia.
 * Entradas: value: valor a escapar.
 * Salidas: Cadena segura para la consulta de filtros.
 * Excepciones: No hay.
 */
function escapeFilterValue(value) {
  return String(value).replace(/"/g, '\\"')
}

/**
 * Nombre: useRelatedProducts
 * Descripción: Consulta productos relacionados según categoría o marca para mostrar sugerencias.
 * Entradas: categoryFacet, brandFacet, excludeId: filtros y exclusión del producto actual.
 * Salidas: Estado con hits y estatus de carga.
 * Excepciones: No hay.
 */
function useRelatedProducts({ categoryFacet, brandFacet, excludeId }) {
  const [state, setState] = useState({ status: 'loading', hits: [] })

  useEffect(() => {
    if (!categoryFacet && !brandFacet) {
      return undefined
    }

    let cancelled = false

    const clauses = []
    if (categoryFacet) clauses.push(`category_facet:"${escapeFilterValue(categoryFacet)}"`)
    if (brandFacet) clauses.push(`brand_facet:"${escapeFilterValue(brandFacet)}"`)
    const filters = clauses.length > 1 ? `(${clauses.join(' OR ')})` : clauses[0]

    searchClient
      .search([
        {
          indexName: INDEX_NAME,
          params: {
            query: '',
            filters,
            hitsPerPage: RELATED_LIMIT + 1,
          },
        },
      ])
      .then((response) => {
        if (cancelled) return
        const hits = (response.results?.[0]?.hits || [])
          .filter((hit) => hit.objectID !== excludeId)
          .slice(0, RELATED_LIMIT)
        setState({ status: hits.length > 0 ? 'ready' : 'empty', hits })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', hits: [] })
      })

    return () => {
      cancelled = true
    }
  }, [categoryFacet, brandFacet, excludeId])

  if (!categoryFacet && !brandFacet) {
    return { status: 'empty', hits: [] }
  }

  return state
}

/**
 * Nombre: RelatedProducts
 * Descripción: Renderiza una fila desplazable con productos relacionados al producto actual.
 * Entradas: categoryFacet, brandFacet, excludeId: datos para encontrar productos similares.
 * Salidas: JSX con la sección de productos relacionados.
 * Excepciones: No hay.
 */
function RelatedProducts({ categoryFacet, brandFacet, excludeId }) {
  const { status, hits } = useRelatedProducts({ categoryFacet, brandFacet, excludeId })
  const trackRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    function updateScrollState() {
      setCanScrollPrev(track.scrollLeft > 4)
      setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4)
    }

    updateScrollState()
    track.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      track.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [hits])

  function scrollByDirection(direction) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: track.clientWidth * 0.8 * direction, behavior: 'smooth' })
  }

  if (status === 'loading' || status === 'empty' || status === 'error') {
    return null
  }

  return (
    <section className="related-products" aria-label="Productos relacionados">
      <div className="related-products__header">
        <h2>Productos relacionados</h2>
        <div className="related-products__nav">
          <button
            type="button"
            onClick={() => scrollByDirection(-1)}
            disabled={!canScrollPrev}
            aria-label="Ver productos anteriores"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection(1)}
            disabled={!canScrollNext}
            aria-label="Ver más productos"
          >
            ›
          </button>
        </div>
      </div>

      <div className="related-products__track" ref={trackRef}>
        {hits.map((hit) => (
          <div className="related-products__item" key={hit.objectID}>
            <ProductCard hit={hit} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
