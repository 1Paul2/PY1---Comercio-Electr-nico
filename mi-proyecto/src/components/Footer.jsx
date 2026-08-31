import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__brand">Maquinaria CR</div>
      <nav className="site-footer__nav">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
      </nav>
    </footer>
  )
}

export default Footer