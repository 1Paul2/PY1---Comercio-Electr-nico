import { RefinementList, RangeInput, ClearRefinements } from 'react-instantsearch'

function Filters() {
  return (
    <aside className="catalog-filters">
      <div className="catalog-filters__header">
        <h2>Filtros</h2>
        <ClearRefinements
          translations={{ resetButtonText: 'Limpiar filtros' }}
        />
      </div>

      <div className="filter-group">
        <h3>Categoría</h3>
        <RefinementList
          attribute="category_facet"
          searchable={false}
          showMore={true}
          showMoreLimit={20}
        />
      </div>

      <div className="filter-group">
        <h3>Marca</h3>
        <RefinementList
          attribute="brand_facet"
          searchable={true}
          translations={{ placeholderText: 'Buscar marca...' }}
          showMore={true}
          showMoreLimit={20}
        />
      </div>

      <div className="filter-group">
        <h3>Precio (₡)</h3>
        <RangeInput
          attribute="pricing.b2c.price_crc"
          translations={{
            separatorElementText: 'a',
            submitButtonText: 'Aplicar',
          }}
        />
      </div>
    </aside>
  )
}

export default Filters