import { InstantSearch } from 'react-instantsearch'
import { searchClient } from '../features/catalog/searchClient'
import SearchHeader from '../features/catalog/SearchHeader'
import Catalog from '../features/catalog/Catalog'

function Productos() {
  return (
    <InstantSearch searchClient={searchClient} indexName="grupo-07_products">
      <SearchHeader />
      <Catalog />
    </InstantSearch>
  )
}

export default Productos