// Debug script to check suppliers in database
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('=== CHECKING ALL SUPPLIERS IN DATABASE ===');
    
    const allSuppliers = await prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
        contactEmail: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`Found ${allSuppliers.length} suppliers:`);
    allSuppliers.forEach((supplier, index) => {
      console.log(`${index + 1}. ID: ${supplier.id}, Name: "${supplier.name}", Email: "${supplier.contactEmail}", Created: ${supplier.createdAt}`);
    });

    // Search specifically for the problematic names
    console.log('\n=== SEARCHING FOR POTENTIALLY PROBLEMATIC SUPPLIERS ===');
    
    const searchTerms = ['Travel Bonanza', 'abc trav', 'bonanza@gmail.com'];
    
    for (const term of searchTerms) {
      console.log(`\nSearching for: "${term}"`);
      
      // Search by name (case insensitive)
      const byName = await prisma.supplier.findMany({
        where: {
          name: {
            contains: term,
            mode: 'insensitive'
          }
        }
      });
      
      // Search by email (case insensitive)
      const byEmail = await prisma.supplier.findMany({
        where: {
          contactEmail: {
            contains: term,
            mode: 'insensitive'
          }
        }
      });
      
      console.log(`  By name: ${byName.length} results`);
      if (byName.length > 0) {
        byName.forEach(s => console.log(`    - "${s.name}" (${s.contactEmail})`));
      }
      
      console.log(`  By email: ${byEmail.length} results`);
      if (byEmail.length > 0) {
        byEmail.forEach(s => console.log(`    - "${s.name}" (${s.contactEmail})`));
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
