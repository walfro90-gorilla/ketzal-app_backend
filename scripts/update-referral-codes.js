// Script para generar referralCodes únicos para usuarios existentes
// Este script debe ejecutarse antes de agregar el constraint único

const { PrismaClient } = require('@prisma/client')
const { customAlphabet } = require('nanoid')

const prisma = new PrismaClient()

// Generador de códigos de referido únicos
const generateReferralCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 8)

async function updateExistingUsers() {
  try {
    console.log('🔄 Actualizando usuarios existentes con códigos de referido...')
    
    // Obtener todos los usuarios sin referralCode
    const usersWithoutCode = await prisma.user.findMany({
      where: {
        referralCode: null
      },
      select: {
        id: true,
        email: true
      }
    })
    
    console.log(`📊 Encontrados ${usersWithoutCode.length} usuarios sin código de referido`)
    
    // Actualizar cada usuario con un código único
    for (const user of usersWithoutCode) {
      let referralCode
      let isUnique = false
      
      // Generar código único
      while (!isUnique) {
        referralCode = generateReferralCode()
        
        // Verificar si ya existe
        const existing = await prisma.user.findFirst({
          where: { referralCode }
        })
        
        if (!existing) {
          isUnique = true
        }
      }
      
      // Actualizar usuario
      await prisma.user.update({
        where: { id: user.id },
        data: { referralCode }
      })
      
      console.log(`✅ Usuario ${user.email} actualizado con código: ${referralCode}`)
    }
    
    console.log('🎉 ¡Todos los usuarios han sido actualizados!')
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  updateExistingUsers()
}

module.exports = { updateExistingUsers }
