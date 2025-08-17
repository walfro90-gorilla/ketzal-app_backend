// Script to check PostgreSQL sequence for Supplier table
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSequence() {
  try {
    console.log('=== CHECKING SUPPLIER TABLE SEQUENCE ===');
    
    // Get the highest ID currently in the table
    const maxIdSupplier = await prisma.supplier.findFirst({
      orderBy: {
        id: 'desc'
      },
      select: {
        id: true
      }
    });
    
    console.log('Highest supplier ID in table:', maxIdSupplier?.id || 'No suppliers found');
    
    // Check the current sequence value using raw SQL
    const sequenceInfo = await prisma.$queryRaw`
      SELECT last_value, is_called 
      FROM "Supplier_id_seq"
    `;
    
    console.log('Current sequence info:', sequenceInfo);
    
    // Try to get the next sequence value
    const nextVal = await prisma.$queryRaw`
      SELECT nextval('"Supplier_id_seq"') as next_id
    `;
    
    console.log('Next sequence value would be:', nextVal);
    
    // Reset the sequence to fix potential issues
    if (maxIdSupplier?.id) {
      const resetResult = await prisma.$queryRaw`
        SELECT setval('"Supplier_id_seq"', ${maxIdSupplier.id}, true)
      `;
      console.log('Sequence reset result:', resetResult);
      
      // Check again after reset
      const newSequenceInfo = await prisma.$queryRaw`
        SELECT last_value, is_called 
        FROM "Supplier_id_seq"
      `;
      console.log('Sequence info after reset:', newSequenceInfo);
    }
    
  } catch (error) {
    console.error('Error checking sequence:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSequence();

async function checkSequence() {
  try {
    console.log('=== CHECKING AUTO-INCREMENT SEQUENCE ===');
    
    // Get the highest ID in the suppliers table
    const maxId = await prisma.supplier.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });
    
    console.log('Max ID in suppliers table:', maxId?.id || 'No records');
    
    // Try to get sequence info (PostgreSQL specific)
    const sequenceInfo = await prisma.$queryRaw`
      SELECT last_value, is_called 
      FROM pg_get_serial_sequence('Supplier', 'id')
    `;
    
    console.log('Sequence info:', sequenceInfo);
    
    // Try a manual insert without specifying ID
    console.log('\n=== TESTING MANUAL INSERT ===');
    
    const testSupplier = await prisma.supplier.create({
      data: {
        name: 'TEST_SUPPLIER_' + Date.now(),
        contactEmail: 'test_' + Date.now() + '@test.com',
        description: 'Test supplier for debugging'
      }
    });
    
    console.log('Successfully created test supplier:', testSupplier);
    
    // Clean up - delete the test supplier
    await prisma.supplier.delete({
      where: { id: testSupplier.id }
    });
    
    console.log('Test supplier deleted successfully');
    
  } catch (error) {
    console.error('Error in sequence check:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSequence();
