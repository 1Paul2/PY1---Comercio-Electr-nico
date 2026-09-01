import { InstantSearch } from 'react-instantsearch'
import { searchClient } from '../features/catalog/searchClient'
import SearchHeader from '../features/catalog/SearchHeader'
import CategoryShowcase from '../features/catalog/CategoryShowcase'
import Footer from '../components/Footer'

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

      <CategoryShowcase />

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