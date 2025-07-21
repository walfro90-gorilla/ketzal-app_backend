const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const locationData = [
  // México - with proper UTF-8 encoding
  { country: 'México', state: 'Ciudad de México', city: 'Ciudad de México' },
  { country: 'México', state: 'Ciudad de México', city: 'Tlalpan' },
  { country: 'México', state: 'Ciudad de México', city: 'Coyoacán' },
  { country: 'México', state: 'Jalisco', city: 'Guadalajara' },
  { country: 'México', state: 'Jalisco', city: 'Zapopan' },
  { country: 'México', state: 'Jalisco', city: 'Puerto Vallarta' },
  { country: 'México', state: 'Nuevo León', city: 'Monterrey' },
  { country: 'México', state: 'Nuevo León', city: 'San Pedro Garza García' },
  { country: 'México', state: 'Yucatán', city: 'Mérida' },
  { country: 'México', state: 'Yucatán', city: 'Valladolid' },
  { country: 'México', state: 'Quintana Roo', city: 'Cancún' },
  { country: 'México', state: 'Quintana Roo', city: 'Playa del Carmen' },
  { country: 'México', state: 'Quintana Roo', city: 'Cozumel' },
  { country: 'México', state: 'Oaxaca', city: 'Oaxaca de Juárez' },
  { country: 'México', state: 'Oaxaca', city: 'Puerto Escondido' },
  
  // Estados Unidos
  { country: 'Estados Unidos', state: 'California', city: 'Los Angeles' },
  { country: 'Estados Unidos', state: 'California', city: 'San Francisco' },
  { country: 'Estados Unidos', state: 'California', city: 'San Diego' },
  { country: 'Estados Unidos', state: 'Nueva York', city: 'Nueva York' },
  { country: 'Estados Unidos', state: 'Nueva York', city: 'Albany' },
  { country: 'Estados Unidos', state: 'Texas', city: 'Houston' },
  { country: 'Estados Unidos', state: 'Texas', city: 'Dallas' },
  { country: 'Estados Unidos', state: 'Texas', city: 'Austin' },
  { country: 'Estados Unidos', state: 'Florida', city: 'Miami' },
  { country: 'Estados Unidos', state: 'Florida', city: 'Orlando' },
  
  // Colombia
  { country: 'Colombia', state: 'Cundinamarca', city: 'Bogotá' },
  { country: 'Colombia', state: 'Antioquia', city: 'Medellín' },
  { country: 'Colombia', state: 'Valle del Cauca', city: 'Cali' },
  { country: 'Colombia', state: 'Atlántico', city: 'Barranquilla' },
  { country: 'Colombia', state: 'Bolívar', city: 'Cartagena' },
  
  // España - with proper UTF-8 encoding
  { country: 'España', state: 'Madrid', city: 'Madrid' },
  { country: 'España', state: 'Cataluña', city: 'Barcelona' },
  { country: 'España', state: 'Andalucía', city: 'Sevilla' },
  { country: 'España', state: 'Valencia', city: 'Valencia' },
  { country: 'España', state: 'País Vasco', city: 'Bilbao' },
];

async function main() {
  console.log('🌍 Sembrando datos de ubicaciones...');
  
  try {
    // Limpiar datos existentes
    await prisma.global_locations.deleteMany({});
    console.log('🧹 Datos anteriores eliminados');
    
    // Insertar nuevos datos uno por uno
    let insertedCount = 0;
    for (const location of locationData) {
      await prisma.global_locations.create({
        data: location
      });
      insertedCount++;
    }
    
    console.log(`✅ Se insertaron ${insertedCount} ubicaciones.`);
    
    // Mostrar resumen por países
    const countries = await prisma.global_locations.groupBy({
      by: ['country'],
      _count: true,
    });
    
    console.log('\n📊 Resumen por países:');
    countries.forEach(country => {
      console.log(`${country.country}: ${country._count} ubicaciones`);
    });
    
    console.log('\n🎉 Proceso completado exitosamente.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
