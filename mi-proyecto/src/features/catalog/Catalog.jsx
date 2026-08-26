import { SearchBox, Hits, Stats } from 'react-instantsearch'
import Filters from './Filters'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

function Catalog() {
  return (
    <div className="catalog">
      <div className="catalog__searchbar">
        <SearchBox
          placeholder="Buscar por nombre, marca o categoría..."
          translations={{ submitButtonTitle: 'Buscar', resetButtonTitle: 'Limpiar' }}
        />
        <Stats
          translations={{
            rootElementText({ nbHits, processingTimeMS }) {
              return `${nbHits} productos encontrados (${processingTimeMS} ms)`
            },
          }}
        />
      </div>

      <div className="catalog__body">
        <Filters />

        <div className="catalog__results">
          <Hits hitComponent={ProductCard} classNames={{ list: 'catalog__grid' }} />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Catalog