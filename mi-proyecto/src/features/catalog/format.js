const crcFormatter = new Intl.NumberFormat('es-CR', {
  style: 'currency',
  currency: 'CRC',
  maximumFractionDigits: 0,
})

export function formatCRC(value) {
  return typeof value === 'number' ? crcFormatter.format(value) : 'Precio no disponible'
}

export function formatPercent(value) {
  return typeof value === 'number' ? `${Math.round(value * 100)}%` : ''
}
