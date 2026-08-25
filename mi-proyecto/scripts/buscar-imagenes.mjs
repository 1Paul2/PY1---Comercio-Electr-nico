import fs from 'fs'
import path from 'path'
import 'dotenv/config'

const SERPER_KEY = process.env.SERPER_API_KEY
const dataDir = './data'

// Ahora procesamos TODOS los archivos, no solo Repuestos_*
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))

// Verifica si la URL realmente carga una imagen
async function urlFunciona(url) {
  if (!url) return false
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(5000) })
    const tipo = res.headers.get('content-type') || ''
    return res.ok && tipo.startsWith('image')
  } catch {
    return false
  }
}

async function buscarImagen(query) {
  const res = await fetch('https://google.serper.dev/images', {
    method: 'POST',
    headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: query, num: 3 }) // pedimos 3 para tener opciones
  })
  const data = await res.json()
  return data.images || []
}

async function procesarArchivo(file) {
  const filePath = path.join(dataDir, file)
  const productos = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const esRepuesto = file.startsWith('Repuestos_')

  for (const producto of productos) {
    const funciona = await urlFunciona(producto.image_url)
    if (funciona) continue // ya tiene una imagen válida, no tocar

    // Para repuestos, agregamos palabras que empujan resultados hacia el repuesto suelto, no la máquina completa
    const query = esRepuesto
      ? `${producto.facets?.type || ''} ${producto.brand} repuesto pieza -maquina completa`
      : `${producto.brand} ${producto.title}`

    console.log('Buscando:', query)
    const resultados = await buscarImagen(query)

    let encontrada = null
    for (const img of resultados) {
      if (await urlFunciona(img.imageUrl)) {
        encontrada = img.imageUrl
        break
      }
    }

    if (encontrada) {
      producto.image_url = encontrada
      console.log('  -> encontrada:', encontrada)
    } else {
      console.log('  -> SIN IMAGEN VÁLIDA:', producto.title)
    }

    await new Promise(r => setTimeout(r, 300))
  }

  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2))
  console.log(`${file} actualizado\n`)
}

async function run() {
  for (const file of files) {
    await procesarArchivo(file)
  }
  console.log('Listo.')
}

run()