import { useState } from 'react'
import { Hits, Stats } from 'react-instantsearch'
import Filters from './Filters'
import ProductCard from './ProductCard'
import Pagination from './Pagination'
import '../../styles/Catalog.css'

/* En escritorio el sidebar no compite por espacio: los filtros se ven.
   En móvil sí compite, y el usuario vino a ver productos, así que arranca
   colapsado. Se pasa la FUNCIÓN a useState (no su resultado) para que se
   evalúe una sola vez en el montaje. El guard de window la deja segura si
   alguna vez hay SSR. */
const filtrosAbiertosPorDefecto = () =>
  typeof window === 'undefined' || window.matchMedia('(min-width: 769px)').matches

function Catalog() {
  const [filtersOpen, setFiltersOpen] = useState(filtrosAbiertosPorDefecto)

  return (
    <div className="catalog">
      <Stats
        translations={{
          rootElementText({ nbHits }) {
            return `${nbHits.toLocaleString()} productos encontrados`
          },
        }}
      />

      <div className="catalog__body">
        <Filters isOpen={filtersOpen} onToggle={() => setFiltersOpen((o) => !o)} />

        <div className="catalog__results">
          <Hits hitComponent={ProductCard} classNames={{ list: 'catalog__grid' }} />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Catalog