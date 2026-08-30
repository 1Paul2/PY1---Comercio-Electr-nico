import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { searchClient } from './searchClient'
import { formatCRC, formatPercent } from './format'

const INDEX_NAME = 'grupo-07_products'

// Traducciones de las llaves de "facets" para mostrarlas legibles en la ficha técnica.
const FACET_LABELS = {
  condition: 'Condición',
  year: 'Año',
  weight_kg: 'Peso (kg)',
  power_hp: 'Potencia (hp)',
  blade_type: 'Tipo de hoja',
  blade_width_m: 'Ancho de hoja (m)',
  brand: 'Marca',
  category: 'Categoría',
  price_range_crc: 'Rango de precio (₡)',
  digging_reach_m: 'Alcance de excavación (m)',
  load_capacity_kg: 'Capacidad de carga (kg)',
  load_capacity_ton: 'Capacidad de carga (ton)',
  bucket_capacity_m3: 'Capacidad de cucharón (m³)',
  drum_width_m: 'Ancho de tambor (m)',
  max_capacity_ton: 'Capacidad máxima (ton)',
  engine_model: 'Modelo de motor',
  fuel_capacity_liters: 'Capacidad de combustible (l)',
}

function useProduct(id) {
  const [result, setResult] = useState(null)

  useEffect(() => {
    let cancelled = false

    searchClient
      .search({
        requests: [
          {
            indexName: INDEX_NAME,
            query: '',
            filters: `objectID:"${id}"`,
            hitsPerPage: 1,
          },
        ],
      })
      .then((response) => {
        if (cancelled) return
        const hit = response.results?.[0]?.hits?.[0]
        setResult({ id, status: hit ? 'found' : 'not-found', product: hit || null })
      })
      .catch(() => {
        if (!cancelled) setResult({ id, status: 'error', product: null })
      })

    return () => {
      cancelled = true
    }
  }, [id])

  if (!result || result.id !== id) {
    return { status: 'loading', product: null }
  }

  return result
}

function ProductDetail({ id }) {
  const { status, product } = useProduct(id)

  if (status === 'loading') {
    return <p className="product-detail__message">Cargando producto...</p>
  }

  if (status === 'error') {
    return <p className="product-detail__message">Ocurrió un error al consultar el producto.</p>
  }

  if (status === 'not-found') {
    return (
      <div className="product-detail__message">
        <p>No se encontró un producto con el ID «{id}».</p>
        <Link to="/productos">Volver al catálogo</Link>
      </div>
    )
  }

  const {
    title,
    description,
    brand,
    categories = [],
    rating,
    image_url,
    facets = {},
    pricing = {},
    locations = [],
    objectID,
    price_range_crc,
    category_facet,
    brand_facet,
  } = product

  const totalStock = locations.reduce((sum, loc) => sum + (loc.stock_quantity || 0), 0)

  return (
    <article className="product-detail">
      <Link to="/productos" className="product-detail__back">
        ← Volver al catálogo
      </Link>

      <div className="product-detail__main">
        <div className="product-detail__image">
          <img
            src={image_url}
            alt={title}
            onError={(e) => {
              e.currentTarget.src = '/icons.svg'
            }}
          />
        </div>

        <div className="product-detail__summary">
          <span className="product-detail__category">{category_facet}</span>
          <h1>{title}</h1>
          <p className="product-detail__brand">{brand}</p>

          {typeof rating === 'number' && (
            <p className="product-detail__rating">⭐ {rating.toFixed(1)} / 5</p>
          )}

          {categories.length > 0 && (
            <div className="product-detail__tags">
              {categories.map((category) => (
                <span key={category} className="product-detail__tag">
                  {category}
                </span>
              ))}
            </div>
          )}

          <p className="product-detail__description">{description}</p>

          <div className="product-detail__pricing">
            <div className="pricing-card pricing-card--b2c">
              <h2>Precio al público (B2C)</h2>
              <p className="pricing-card__price">{formatCRC(pricing.b2c?.price_crc)}</p>
              <p className={pricing.b2c?.in_stock ? 'in-stock' : 'out-of-stock'}>
                {pricing.b2c?.in_stock ? 'Disponible' : 'Agotado'}
              </p>
            </div>

            {pricing.b2b && (
              <div className="pricing-card pricing-card--b2b">
                <h2>Precio mayorista (B2B)</h2>
                <p className="pricing-card__price">{formatCRC(pricing.b2b.price_crc)}</p>
                <p>Pedido mínimo: {pricing.b2b.min_order_quantity} unidad(es)</p>

                {pricing.b2b.volume_discounts?.length > 0 && (
                  <table className="pricing-card__discounts">
                    <thead>
                      <tr>
                        <th>Desde (unidades)</th>
                        <th>Descuento</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricing.b2b.volume_discounts.map((discount) => (
                        <tr key={discount.min_units}>
                          <td>{discount.min_units}</td>
                          <td>{formatPercent(discount.discount_pct)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {locations.length > 0 && (
        <section className="product-detail__section">
          <h2>Disponibilidad por sede</h2>
          <table className="product-detail__locations">
            <thead>
              <tr>
                <th>Sede</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.site}>
                  <td>{location.site}</td>
                  <td>{location.stock_quantity}</td>
                </tr>
              ))}
              <tr className="product-detail__locations-total">
                <td>Total</td>
                <td>{totalStock}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}

      {Object.keys(facets).length > 0 && (
        <section className="product-detail__section">
          <h2>Ficha técnica</h2>
          <dl className="product-detail__specs">
            {Object.entries(facets).map(([key, value]) => (
              <div key={key} className="product-detail__spec">
                <dt>{FACET_LABELS[key] || key}</dt>
                <dd>{String(value)}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="product-detail__section product-detail__meta">
        <h2>Metadatos</h2>
        <dl className="product-detail__specs">
          <div className="product-detail__spec">
            <dt>ID de producto</dt>
            <dd>{objectID}</dd>
          </div>
          <div className="product-detail__spec">
            <dt>Categoría (faceta)</dt>
            <dd>{category_facet}</dd>
          </div>
          <div className="product-detail__spec">
            <dt>Marca (faceta)</dt>
            <dd>{brand_facet}</dd>
          </div>
          <div className="product-detail__spec">
            <dt>Rango de precio</dt>
            <dd>{price_range_crc}</dd>
          </div>
        </dl>
      </section>
    </article>
  )
}

export default ProductDetail
