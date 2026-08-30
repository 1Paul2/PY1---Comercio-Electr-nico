import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import ProductDetail from '../features/catalog/ProductDetail'

function ProductoDetalle() {
  const { id } = useParams()

  return (
    <>
      <Header />
      <ProductDetail id={id} />
    </>
  )
}

export default ProductoDetalle
