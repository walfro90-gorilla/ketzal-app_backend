const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDuplicateReferralCodes() {
  try {
    console.log('🔍 Verificando duplicados en referralCode...')
    
    // Buscar duplicados
    const duplicates = await prisma.$queryRaw`
      SELECT "referralCode", COUNT(*) as count 
      FROM "User" 
      WHERE "referralCode" IS NOT NULL 
      GROUP BY "referralCode" 
      HAVING COUNT(*) > 1
    `
    
    if (duplicates.length > 0) {
      console.log('🚨 Códigos duplicados encontrados:')
      duplicates.forEach(dup => {
        console.log(`- ${dup.referralCode}: ${dup.count} veces`)
      })
      
      // Corregir duplicados
      for (const duplicate of duplicates) {
        const users = await prisma.user.findMany({
          where: { referralCode: duplicate.referralCode },
          orderBy: { createdAt: 'asc' }
        })
        
        // Mantener el primer usuario, cambiar los demás
        for (let i = 1; i < users.length; i++) {
          let newCode
          let isUnique = false
          
          while (!isUnique) {
            newCode = Math.random().toString(36).substring(2, 8).toUpperCase()
            const existing = await prisma.user.findFirst({
              where: { referralCode: newCode }
            })
            if (!existing) {
              isUnique = true
            }
          }
          
          await prisma.user.update({
            where: { id: users[i].id },
            data: { referralCode: newCode }
          })
          
          console.log(`✅ Usuario ${users[i].email} actualizado con nuevo código: ${newCode}`)
        }
      }
    } else {
      console.log('✅ No hay duplicados en referralCode')
    }
    
    // Verificar usuarios sin código
    const usersWithoutCode = await prisma.user.count({
      where: { 
        OR: [
          { referralCode: null },
          { referralCode: '' }
        ]
      }
    })
    
    console.log(`📊 Usuarios sin código: ${usersWithoutCode}`)
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkDuplicateReferralCodes()
