const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Verificando base de datos...');
    
    // Contar registros
    const count = await prisma.global_locations.count();
    console.log(`📊 Total de registros: ${count}`);
    
    // Obtener algunos registros
    if (count > 0) {
      const samples = await prisma.global_locations.findMany({
        take: 5
      });
      console.log('📋 Muestra de datos:');
      samples.forEach((location, index) => {
        console.log(`  ${index + 1}. ID: ${location.id}, País: ${location.country}, Estado: ${location.state}, Ciudad: ${location.city}`);
      });
    } else {
      console.log('❌ No se encontraron datos en la tabla global_locations');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();
