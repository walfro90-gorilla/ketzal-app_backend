const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function resetGlobalLocationsTable() {
  try {
    console.log('🔄 Reseteando tabla global_locations...\n');
    
    // Borrar la tabla existente
    await prisma.$queryRaw`DROP TABLE IF EXISTS "global_locations" CASCADE`;
    console.log('✅ Tabla anterior eliminada');
    
    // Crear la tabla nueva con el tipo correcto
    await prisma.$queryRaw`
      CREATE TABLE "global_locations" (
        "id" SERIAL PRIMARY KEY,
        "country" TEXT NOT NULL,
        "state" TEXT NOT NULL,  
        "city" TEXT NOT NULL
      )
    `;
    console.log('✅ Tabla recreada con tipo SERIAL');
    
    console.log('\n🎉 Tabla reseteada correctamente');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

resetGlobalLocationsTable();
