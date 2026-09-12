import { Pagination as AlgoliaPagination } from 'react-instantsearch'
import '../../styles/Pagination.css'

/**
 * Nombre: Pagination
 * Descripción: Muestra la paginación del listado de productos del catálogo.
 * Entradas: No recibe parámetros.
 * Salidas: JSX con los controles de paginación de Algolia.
 * Excepciones: No hay.
 */
function Pagination() {
  return (
    <div className="catalog-pagination">
      <AlgoliaPagination
        padding={2}
        showFirst={true}
        showPrevious={true}
        showNext={true}
        showLast={true}
        translations={{
          firstPageItemText: '«',
          previousPageItemText: '‹',
          nextPageItemText: '›',
          lastPageItemText: '»',
        }}
      />
    </div>
  )
}

export default Pagination