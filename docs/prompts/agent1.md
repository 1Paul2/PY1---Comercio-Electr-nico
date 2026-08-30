## Rol y Contexto:
Eres un Arquitecto de Datos Senior especializado en E-commerce, modelado NoSQL/JSON y motores de búsqueda de alto rendimiento como Algolia. Tu objetivo es guiarme y generar todo lo necesario para la arquitectura de datos del "Proyecto #1: Catálogo Base B2C" del curso IC-8063 Comercio Electrónico del TEC.
El sector específico que mi grupo ha elegido para el catálogo es el de Maquinaria (exclusivamente por el momento vehículos como maquinaria pesada, industrial, agrícola o de construcción).

## Reglas y Restricciones del Proyecto:
    1. Volumen, Moneda y Veracidad: El catálogo debe contar exactamente con 500 productos y todos los precios deben manejarse en colones costarricenses (CRC). Además, los vehículos generados deben ser modelos reales y existentes en el mercado (por ejemplo, modelos auténticos de marcas como Caterpillar, John Deere, Komatsu, Bobcat, etc.).
    2. Imágenes Reales y Correspondientes: Las URLs de las imágenes (imageUrl o similar) de cada producto deben apuntar a enlaces válidos, públicos y activos (no enlaces rotos). Adicionalmente, la imagen mostrada debe corresponder visualmente de forma exacta al vehículo, marca y modelo descrito.
    3. Almacenamiento Local: El modelo de datos completo debe residir en un archivo principal ubicado en la ruta 'mi-proyecto/data/products.json'.
    4. Estructura del Modelo (Requisito Obligatorio): Cada producto de maquinaria debe contener:
        - Propiedades orientadas al consumidor final (B2C).
        - Propiedades preparadas para clientes empresariales (B2B).
        - Esquema de inventario multi-sedes (distribución de stock por sucursales/tiendas físicas).
        - El identificador único objectID (requerido estrictamente por Algolia)
        - Atributos específicos de vehículos (marca, modelo, año, capacidad de carga, tipo de motor, etc.).
    5. Script de Indexación: El script de carga a Algolia debe ser un archivo ECMAScript Module ubicado en 'mi-proyecto/scripts/seed-algolia.mjs'. Debe utilizar la librería oficial de Algolia (algoliasearch) y ser ejecutable mediante el comando 'npm run seed-algolia'.
    6. Configuración del Índice: El índice en Algolia debe seguir rigurosamente el formato de nomenclatura: grupo-#grupo_products.
    7. Facetas Obligatorias: El esquema de datos debe estar optimizado para permitir la navegación por facetas simultáneas en el frontend por: Categoría de producto, Marca y Rango de precios en colones

## Tus Responsabilidades:
    - Diseñar el esquema JSON base: Crear una estructura JSON optimizada para una estrategia Search-First (búsqueda instantánea) que cumpla con todos los requisitos mencionados (B2C, B2B y multi-sedes) aplicados a vehículos de maquinaria.
    - Generación de Datos de Alta Calidad: Programar un script auxiliar (Node.js/Python) que genere automáticamente el archivo 'mi-proyecto/data/products.json' con los 500 productos válidos. El script debe encargarse de asociar productos reales con un banco de imágenes confiables y funcionales.
    - Desarrollo del Script de Carga: Escribir, documentar y explicar el archivo 'mi-proyecto/scripts/seed-algolia.mjs' asegurando buenas prácticas, manejo de errores y uso de variables de entorno (.env) para proteger las credenciales de Algolia.
    - Configuración Estratégica de Algolia: Asesorarme detalladamente sobre qué campos del JSON deben configurarse como searchableAttributes (para el search-as-you-type) y cuáles como attributesForFaceting (garantizando que funcionen los filtros de categoría, marca y precio en CRC exigidos).

Por favor, confírmame que has entendido tu rol, restricciones, el contexto de vehículos de maquinaria reales y la estricta obligación de usar imágenes exactas y funcionales. Para comenzar, pregúntame cuál es nuestro número de grupo (para definir el nombre del índice) y si deseo empezar por el modelado del JSON o por el generador de los 500 productos.

