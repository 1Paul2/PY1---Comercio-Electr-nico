import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

/**
 * Nombre: ThemeProvider
 * Descripción: Proporciona el tema actual de la aplicación y expone la función para cambiarlo.
 * Entradas: children: contenido que quedará envuelto dentro del proveedor.
 * Salidas: JSX con el contexto de tema disponible para los componentes hijos.
 * Excepciones: No hay.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Nombre: useTheme
 * Descripción: Accede al contexto del tema activo para leerlo o cambiarlo.
 * Entradas: No recibe parámetros.
 * Salidas: Objeto con el tema actual y la función toggleTheme.
 * Excepciones: No hay.
 */
export function useTheme() {
  return useContext(ThemeContext)
}