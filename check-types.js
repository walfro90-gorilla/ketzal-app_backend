const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkDataTypes() {
  try {
    console.log('🔍 Verificando tipos de datos...\n');
    
    const sample = await prisma.global_locations.findFirst();
    
    if (sample) {
      console.log('📋 Muestra de dato:', sample);
      console.log('🔢 Tipo de ID:', typeof sample.id);
      console.log('🔢 Valor de ID:', sample.id);
      console.log('📝 ID es BigInt:', sample.id instanceof BigInt || typeof sample.id === 'bigint');
      
      // Intentar serializar
      try {
        const serialized = JSON.stringify(sample);
        console.log('✅ Serialización exitosa');
      } catch (error) {
        console.log('❌ Error de serialización:', error.message);
        
        // Convertir BigInt a number
        const converted = {
          ...sample,
          id: Number(sample.id)
        };
        console.log('🔄 Conversión manual:', converted);
        console.log('✅ Serialización después de conversión:', JSON.stringify(converted));
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDataTypes();
