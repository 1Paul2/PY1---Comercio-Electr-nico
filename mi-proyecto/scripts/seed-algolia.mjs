import { algoliasearch } from 'algoliasearch'
import { readFileSync } from 'fs'
import 'dotenv/config'

const appId = process.env.ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY

if (!appId || !adminKey) {
  console.error('Faltan las variables ALGOLIA_APP_ID o ALGOLIA_ADMIN_KEY en tu .env')
  process.exit(1)
}

const client = algoliasearch(appId, adminKey)

const products = JSON.parse(readFileSync('./data/products.json', 'utf-8'))

async function seed() {
  const { taskID } = await client.saveObjects({
    indexName: 'grupo-07_products', 
    objects: products,
  })

  console.log(`Indexación completa. Task ID: ${taskID}`)
  console.log(`${products.length} productos enviados a Algolia.`)
}

seed().catch((err) => {
  console.error('Error al indexar:', err)
  process.exit(1)
})