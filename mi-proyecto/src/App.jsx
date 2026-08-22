import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './pages/Productos'

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Inicio</Link>
        {' | '}
        <Link to="/productos">Productos</Link>
      </nav>
      <br />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </div>
  )
}

export default App