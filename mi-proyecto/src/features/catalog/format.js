const crcFormatter = new Intl.NumberFormat('es-CR', {
  style: 'currency',
  currency: 'CRC',
  maximumFractionDigits: 0,
})

/**
 * Nombre: formatCRC
 * Descripción: Formatea un valor monetario en colones costarricenses para mostrarse en la UI.
 * Entradas: value: número a formatear.
 * Salidas: Cadena con el monto formateado o un texto alternativo si no hay valor.
 * Excepciones: No hay.
 */
export function formatCRC(value) {
  return typeof value === 'number' ? crcFormatter.format(value) : 'Precio no disponible'
}

/**
 * Nombre: formatCRCParts
 * Descripción: Divide un valor monetario en símbolo y monto para renderizarlo con estilo.
 * Entradas: value: número a transformar.
 * Salidas: Objeto con symbol y amount, o null si el valor no es numérico.
 * Excepciones: No hay.
 */
export function formatCRCParts(value) {
  if (typeof value !== 'number') return null

  const symbol = crcFormatter.formatToParts(value).find((part) => part.type === 'currency')?.value ?? '₡'
  const amount = crcFormatter
    .formatToParts(value)
    .filter((part) => part.type !== 'currency' && part.type !== 'literal')
    .map((part) => part.value)
    .join('')

  return { symbol, amount }
}

/**
 * Nombre: formatPercent
 * Descripción: Convierte un valor decimal en porcentaje para mostrar descuentos o tasas.
 * Entradas: value: número decimal entre 0 y 1.
 * Salidas: Texto con el porcentaje redondeado.
 * Excepciones: No hay.
 */
export function formatPercent(value) {
  return typeof value === 'number' ? `${Math.round(value * 100)}%` : ''
}
