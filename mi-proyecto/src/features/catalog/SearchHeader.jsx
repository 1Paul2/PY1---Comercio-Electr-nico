import { Link, useNavigate } from 'react-router-dom'
import { SearchBox } from 'react-instantsearch'
import ThemeToggle from '../../components/ThemeToggle'
import '../../styles/SearchHeader.css'

function SearchHeader({ redirectSearchTo }) {
  const navigate = useNavigate()

  const redirectProps = redirectSearchTo
    ? {
        searchAsYouType: false,
        queryHook: (query, search) => {
          const trimmed = query.trim()
          if (trimmed) {
            navigate(`${redirectSearchTo}?q=${encodeURIComponent(trimmed)}`)
          } else {
            search(query)
          }
        },
      }
    : {}

  return (
    <header className="search-header">
      <div className="search-header__left">
        <Link to="/" className="site-header__logo">
          ⚙️ Maquinaria CR
        </Link>

        <nav className="site-header__nav">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
        </nav>
      </div>

      <div className="search-header__center">
        <div className="search-wrapper">
          {/* El CSS reserva 44px de padding-left para este icono. Sin el
              elemento, ese espacio quedaba vacio y sin lupa. */}
          <svg
            className="search-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <SearchBox
            placeholder="Buscar productos..."
            translations={{ submitButtonTitle: 'Buscar', resetButtonTitle: 'Limpiar' }}
            classNames={{ root: 'search-header__box' }}
            {...redirectProps}
          />
        </div>
      </div>

      <div className="search-header__right">
        <ThemeToggle />
      </div>
    </header>
  )
}

export default SearchHeader