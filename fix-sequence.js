// Fix sequence using raw SQL through Prisma
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function fixSequence() {
  try {
    console.log('=== FIXING SUPPLIER SEQUENCE ===');
    
    // Get the maximum ID from the table
    const maxIdResult = await prisma.supplier.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });
    
    const maxId = maxIdResult?.id || 0;
    console.log('Maximum ID found:', maxId);
    
    // Set the sequence to the correct value
    const nextId = maxId + 1;
    console.log('Setting sequence to:', nextId);
    
    // This should fix the sequence issue
    await prisma.$executeRaw`
      SELECT setval(pg_get_serial_sequence('"Supplier"', 'id'), ${nextId}, false)
    `;
    
    console.log('✅ Sequence fixed! Next ID will be:', nextId);
    
    // Test the fix by trying to create a test supplier
    const testData = {
      name: "SEQUENCE TEST " + Date.now(),
      contactEmail: "seqtest" + Date.now() + "@test.com",
      phoneNumber: "1234567890",
      address: "Test Address",
      description: "Sequence test",
      imgLogo: "https://test.com/test.jpg"
    };
    
    console.log('Testing with new supplier creation...');
    
    const newSupplier = await prisma.supplier.create({
      data: testData,
      select: {
        id: true,
        name: true,
        contactEmail: true
      }
    });
    
    console.log('✅ SUCCESS! Created supplier:', newSupplier);
    
    // Clean up the test supplier
    await prisma.supplier.delete({
      where: { id: newSupplier.id }
    });
    
    console.log('✅ Test supplier cleaned up. Sequence is now working!');
    
  } catch (error) {
    console.error('❌ Error fixing sequence:', error);
    
    // Try alternative method
    try {
      console.log('Trying alternative sequence reset method...');
      
      await prisma.$executeRaw`
        ALTER SEQUENCE "Supplier_id_seq" RESTART WITH ${maxId + 1}
      `;
      
      console.log('✅ Alternative method applied!');
      
    } catch (altError) {
      console.error('❌ Alternative method also failed:', altError);
    }
  } finally {
    await prisma.$disconnect();
  }
}

fixSequence();
