import { Link } from 'react-router-dom'

/**
 * Nombre: Header
 * Descripción: Renderiza el encabezado principal con la marca y los enlaces de navegación.
 * Entradas: No recibe parámetros.
 * Salidas: JSX con el menú superior del sitio.
 * Excepciones: No hay.
 */
function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="site-header__logo">
        Maquinaria CR
      </Link>

      <nav className="site-header__nav">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
      </nav>
    </header>
  )
}

export default Header