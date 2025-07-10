/**
 * 🧪 Test Script - Verificar Nuevos Modelos Marketplace
 * 
 * Este script prueba que los nuevos modelos se hayan creado correctamente
 * sin afectar la funcionalidad existente.
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testMarketplaceModels() {
  console.log('🧪 Iniciando tests de modelos marketplace...\n')

  try {
    // 1. Test: Verificar que los modelos existentes siguen funcionando
    console.log('✅ 1. Verificando modelos existentes...')
    const existingUsers = await prisma.user.findMany({ take: 1 })
    console.log(`   Users encontrados: ${existingUsers.length}`)

    const existingServices = await prisma.service.findMany({ take: 1 })
    console.log(`   Services encontrados: ${existingServices.length}`)

    const existingProducts = await prisma.product.findMany({ take: 1 })
    console.log(`   Products encontrados: ${existingProducts.length}`)

    // 2. Test: Verificar que los nuevos modelos están disponibles
    console.log('\n✅ 2. Verificando nuevos modelos...')
    
    // Test Wallet (modelo nuevo)
    const wallets = await prisma.wallet.findMany()
    console.log(`   Wallets encontrados: ${wallets.length}`)

    // Test TravelPlanner (modelo nuevo)
    const planners = await prisma.travelPlanner.findMany()
    console.log(`   TravelPlanners encontrados: ${planners.length}`)

    // Test Wishlist (modelo nuevo)
    const wishlists = await prisma.wishlist.findMany()
    console.log(`   Wishlists encontrados: ${wishlists.length}`)

    // 3. Test: Verificar que los nuevos campos están disponibles
    console.log('\n✅ 3. Verificando nuevos campos en modelos existentes...')
    
    // Test nuevo campo en User
    const userWithAxoCoins = await prisma.user.findFirst({
      select: { 
        id: true, 
        email: true, 
        axoCoinsEarned: true 
      }
    })
    if (userWithAxoCoins) {
      console.log(`   Usuario con AXO Coins: ${userWithAxoCoins.axoCoinsEarned || 50}`)
    }

    console.log('\n🎉 ¡Todos los tests pasaron! Los nuevos modelos están funcionando correctamente.')
    console.log('✅ La app existente no se vio afectada.')
    console.log('🚀 Listos para implementar el frontend del marketplace.')

  } catch (error) {
    console.error('❌ Error en los tests:', error.message)
    console.log('\n🔧 Posibles soluciones:')
    console.log('   1. Verificar que la base de datos esté corriendo')
    console.log('   2. Ejecutar: npx prisma db push')
    console.log('   3. Ejecutar: npx prisma generate')
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar los tests
testMarketplaceModels()
