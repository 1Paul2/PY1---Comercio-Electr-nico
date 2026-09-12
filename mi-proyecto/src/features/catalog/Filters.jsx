import { RefinementList, RangeInput, ClearRefinements } from 'react-instantsearch'
import '../../styles/Filters.css'

/**
 * Nombre: Filters
 * Descripción: Muestra el panel de filtros del catálogo con categorías, marcas y rango de precio.
 * Entradas: isOpen: indica si el panel está abierto; onToggle: función para alternar su estado.
 * Salidas: JSX con el bloque de filtros interactivo.
 * Excepciones: No hay.
 */
function Filters({ isOpen, onToggle }) {
  return (
    <div className={`catalog-filters-wrap ${isOpen ? '' : 'is-collapsed'}`}>
      <button
        type="button"
        className="filters-toggle"
        onClick={onToggle}
        aria-label={isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
        title={isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
      >
        <span className="filters-toggle__icon" aria-hidden="true">
          {isOpen ? '‹' : '›'}
        </span>
        <span className="filters-toggle__label">
          {isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
        </span>
      </button>

      <aside className="catalog-filters">
        <div className="catalog-filters__header">
          <h2>Filtros</h2>
          <ClearRefinements translations={{ resetButtonText: 'Limpiar filtros' }} />
        </div>

        <div className="filter-group">
          <h3>Categoría</h3>
          <RefinementList
            attribute="category_facet"
            searchable={false}
            translations={{
              showMoreButtonText({ isShowingMore }) {
                return isShowingMore ? 'Ver menos' : 'Ver más'
              },
            }}
            showMore={true}
            showMoreLimit={20}
          />
        </div>

        <div className="filter-group">
          <h3>Marca</h3>
          <RefinementList
            attribute="brand_facet"
            searchable={true}
            translations={{
              placeholderText: 'Buscar marca...',
              showMoreButtonText({ isShowingMore }) {
                return isShowingMore ? 'Ver menos' : 'Ver más'
              },
            }}
            showMore={true}
            showMoreLimit={20}
          />
        </div>

        <div className="filter-group">
          <h3>Precio (₡)</h3>
          <RangeInput
            attribute="pricing.b2c.price_crc"
            translations={{ 
              separatorElementText: '—', 
              submitButtonText: 'Aplicar'
            }}
          />
        </div>
      </aside>
    </div>
  )
}

export default Filters