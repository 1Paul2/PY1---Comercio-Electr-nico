import { Link } from 'react-router-dom'
import { InstantSearch } from 'react-instantsearch'
import { searchClient } from '../features/catalog/searchClient'
import SearchHeader from '../features/catalog/SearchHeader'
import Footer from '../components/Footer'

const CATEGORIES = [
  { label: 'Excavadoras', slug: 'Excavadora' },
  { label: 'Bulldozers', slug: 'Bulldozer' },
  { label: 'Cargadores de Ruedas', slug: 'Cargador de Ruedas' },
  { label: 'Retroexcavadoras', slug: 'Retroexcavadora' },
  { label: 'Grúas', slug: 'Grúa' },
  { label: 'Montacargas', slug: 'Montacargas' },
  { label: 'Compactadoras', slug: 'Compactadora' },
  { label: 'Mezcladoras de Concreto', slug: 'Mezcladora de Concreto' },
  { label: 'Minicargadores', slug: 'Minicargador' },
  { label: 'Motoniveladoras', slug: 'Motoniveladora' },
  { label: 'Camiones de Volteo', slug: 'Camión de Volteo' },
  { label: 'Tractores Agrícolas', slug: 'Tractor Agrícola' },
]

const VALUE_PROPS = [
  {
    title: 'Stock en tiempo real',
    text: 'Disponibilidad actualizada por sede, sin sorpresas al momento de comprar.',
  },
  {
    title: 'Precios B2C y mayoristas',
    text: 'Precio al público y tarifas por volumen para compras B2B, con descuentos por cantidad.',
  },
  {
    title: 'Cotización directa',
    text: 'Solicitá una cotización de cualquier producto en un clic, sin formularios largos.',
  },
]

function Home() {
  return (
    <InstantSearch searchClient={searchClient} indexName="grupo-07_products">
      <SearchHeader redirectSearchTo="/productos" />

      <section className="home-hero">
        <h1>Maquinaria pesada y repuestos, al instante</h1>
        <p>Buscá entre cientos de equipos y repuestos con disponibilidad y precio en tiempo real.</p>
      </section>

      <section className="home-categories">
        <h2>Explorá por categoría</h2>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/productos?categoria=${encodeURIComponent(cat.slug)}`}
              className="category-card"
            >
              <span className="category-card__label">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-value-props">
        <div className="value-props">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className="value-prop">
              <h3>{prop.title}</h3>
              <p>{prop.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </InstantSearch>
  )
}

export default Home