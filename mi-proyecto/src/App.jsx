import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './pages/Productos'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App