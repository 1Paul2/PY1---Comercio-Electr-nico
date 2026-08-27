import { Link } from 'react-router-dom'
import { SearchBox } from 'react-instantsearch'
import ThemeToggle from '../../components/ThemeToggle'

function SearchHeader() {
  return (
    <header className="search-header">
      <Link to="/" className="site-header__logo">
        ⚙️ Maquinaria CR
      </Link>

      <nav className="site-header__nav">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
      </nav>

      <div className="search-wrapper">
        <SearchBox
          placeholder="Buscar productos..."
          translations={{ submitButtonTitle: 'Buscar', resetButtonTitle: 'Limpiar' }}
          classNames={{ root: 'search-header__box' }}
        />
      </div>

      <ThemeToggle />
    </header>
  )
}

export default SearchHeader