import { InstantSearch } from 'react-instantsearch'
import { searchClient } from '../features/catalog/searchClient'
import Catalog from '../features/catalog/Catalog'

function Productos() {
  return (
    <InstantSearch searchClient={searchClient} indexName="grupo-07_products">
      <h1>Catálogo de Productos</h1>
      <Catalog />
    </InstantSearch>
  )
}

export default Productos