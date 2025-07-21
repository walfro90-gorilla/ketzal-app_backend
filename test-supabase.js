const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSupabaseConnection() {
  try {
    console.log('🔄 Probando conexión a Supabase...\n');
    
    // Probar conexión básica
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Conexión exitosa:', result);
    
    // Verificar que la tabla global_locations existe
    const tableExists = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'global_locations'
    `;
    console.log('📊 Tabla global_locations existe:', tableExists.length > 0);
    
    // Contar registros existentes
    const count = await prisma.global_locations.count();
    console.log(`📈 Registros existentes en global_locations: ${count}`);
    
    if (count > 0) {
      const sample = await prisma.global_locations.findMany({ take: 3 });
      console.log('📋 Muestra de datos:');
      sample.forEach((loc, index) => {
        console.log(`   ${index + 1}. ${loc.country} > ${loc.state} > ${loc.city}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testSupabaseConnection();
