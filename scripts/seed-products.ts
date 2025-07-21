import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Mochila de Aventura Ketzal Pro',
    description: 'Mochila de alta calidad diseñada para aventureros. Resistente al agua, múltiples compartimentos y sistema de ventilación.',
    price: 1299.99,
    priceAxo: 65.00,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'travel-gear',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
      'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=500'
    ]),
    specifications: JSON.stringify({
      weight: '2.1 kg',
      dimensions: '55 x 35 x 25 cm',
      capacity: '45L',
      material: 'Nylon ripstop 420D',
      features: ['Resistente al agua', 'Sistema de ventilación', 'Correas ajustables', 'Compartimento para laptop']
    }),
    tags: JSON.stringify(['mochila', 'aventura', 'viaje', 'resistente', 'camping'])
  },
  {
    name: 'Botella Térmica Ketzal',
    description: 'Botella térmica de acero inoxidable que mantiene bebidas frías por 24h y calientes por 12h.',
    price: 449.99,
    priceAxo: 22.50,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'travel-gear',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'
    ]),
    specifications: JSON.stringify({
      weight: '380g',
      dimensions: '26.5 x 7.3 cm',
      capacity: '500ml',
      material: 'Acero inoxidable 304',
      features: ['Doble pared', 'Sin BPA', 'Tapa hermética', 'Fácil limpieza']
    }),
    tags: JSON.stringify(['botella', 'térmica', 'viaje', 'sostenible', 'hidratación'])
  },
  {
    name: 'Kit de Supervivencia Básico',
    description: 'Kit completo de supervivencia para aventuras al aire libre. Incluye brújula, silbato, manta térmica y más.',
    price: 789.99,
    priceAxo: 39.50,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500',
    category: 'survival',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500',
      'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=500'
    ]),
    specifications: JSON.stringify({
      weight: '450g',
      dimensions: '20 x 15 x 5 cm',
      material: 'Varios materiales resistentes',
      features: ['Brújula', 'Silbato', 'Manta térmica', 'Cuerda paracord', 'Mechero', 'Navaja multiusos']
    }),
    tags: JSON.stringify(['supervivencia', 'emergencia', 'outdoor', 'camping', 'aventura'])
  },
  {
    name: 'Hamaca Portátil Ultraligera',
    description: 'Hamaca ultra portátil y ligera, perfecta para descansar en cualquier aventura. Incluye cuerdas y mosquetones.',
    price: 599.99,
    priceAxo: 30.00,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500',
    category: 'camping',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500',
      'https://images.unsplash.com/photo-1571069294851-aeb85a58f7b9?w=500'
    ]),
    specifications: JSON.stringify({
      weight: '680g',
      dimensions: '290 x 140 cm (desplegada)',
      capacity: 'Hasta 150kg',
      material: 'Nylon paracaídas 210T',
      features: ['Ultra ligera', 'Secado rápido', 'Incluye cuerdas', 'Bolsa de transporte', 'Fácil instalación']
    }),
    tags: JSON.stringify(['hamaca', 'camping', 'portátil', 'descanso', 'outdoor'])
  },
  {
    name: 'Mezcal Artesanal Oaxaca',
    description: 'Mezcal artesanal 100% agave espadín de Oaxaca. Edición especial para viajeros amantes de la cultura mexicana.',
    price: 899.99,
    priceAxo: 45.00,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500',
    category: 'souvenirs',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500'
    ]),
    specifications: JSON.stringify({
      weight: '1.2kg',
      dimensions: '30 x 8 x 8 cm',
      capacity: '750ml',
      alcohol: '45% Vol.',
      features: ['100% Agave espadín', 'Producción artesanal', 'Denominación de origen', 'Botella de vidrio', 'Edición especial']
    }),
    tags: JSON.stringify(['mezcal', 'oaxaca', 'artesanal', 'souvenir', 'méxico'])
  },
  {
    name: 'Cámara Instantánea Retro',
    description: 'Cámara instantánea vintage perfecta para capturar recuerdos únicos de tus viajes. Incluye película para 10 fotos.',
    price: 2199.99,
    priceAxo: 110.00,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
    category: 'electronics',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500'
    ]),
    specifications: JSON.stringify({
      weight: '460g',
      dimensions: '11.8 x 11 x 6.8 cm',
      features: ['Fotos instantáneas', 'Flash automático', 'Visor óptico', 'Batería recargable', 'Diseño retro']
    }),
    tags: JSON.stringify(['cámara', 'instantánea', 'fotografía', 'recuerdos', 'vintage'])
  },
  {
    name: 'Gorra Ketzal Adventure',
    description: 'Gorra oficial Ketzal con protección UV. Diseño moderno y cómodo para todas tus aventuras.',
    price: 299.99,
    priceAxo: 15.00,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
    category: 'apparel',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=500'
    ]),
    specifications: JSON.stringify({
      material: '100% Algodón orgánico',
      sizes: ['S/M', 'L/XL'],
      features: ['Protección UV 50+', 'Transpirable', 'Ajustable', 'Logo bordado', 'Lavable en máquina']
    }),
    tags: JSON.stringify(['gorra', 'protección', 'sol', 'ketzal', 'aventura'])
  },
  {
    name: 'Powerbank Solar 20000mAh',
    description: 'Batería portátil con panel solar, perfecta para mantener tus dispositivos cargados durante aventuras largas.',
    price: 1599.99,
    priceAxo: 80.00,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    category: 'electronics',
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500'
    ]),
    specifications: JSON.stringify({
      weight: '530g',
      dimensions: '16 x 8.5 x 2.5 cm',
      capacity: '20000mAh',
      features: ['Panel solar', 'Resistente al agua IP65', 'Linterna LED', '2 puertos USB', 'Indicador de batería']
    }),
    tags: JSON.stringify(['powerbank', 'solar', 'cargador', 'portátil', 'outdoor'])
  }
];

async function seedProducts() {
  console.log('🌱 Sembrando productos de ejemplo...');
  
  try {
    // Limpiar productos existentes (opcional)
    // await prisma.product.deleteMany({});
    
    for (const product of sampleProducts) {
      const existingProduct = await prisma.product.findUnique({
        where: { name: product.name }
      });
      
      if (!existingProduct) {
        await prisma.product.create({
          data: product
        });
        console.log(`✅ Producto creado: ${product.name}`);
      } else {
        console.log(`⚠️ Producto ya existe: ${product.name}`);
      }
    }
    
    console.log('🎉 ¡Productos sembrados exitosamente!');
  } catch (error) {
    console.error('❌ Error sembrando productos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
