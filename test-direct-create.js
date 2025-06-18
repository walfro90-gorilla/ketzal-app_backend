// Test direct supplier creation
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDirectCreation() {
  try {
    console.log('=== TESTING DIRECT SUPPLIER CREATION ===');
    
    // Get current max ID
    const maxIdSupplier = await prisma.supplier.findFirst({
      orderBy: { id: 'desc' },
      select: { id: true }
    });
    
    console.log('Current max ID:', maxIdSupplier?.id || 'No suppliers found');
    
    // Test data - exactly like the frontend is sending
    const testData = {
      name: "TEST SUPPLIER " + Date.now(),
      contactEmail: "test" + Date.now() + "@test.com",
      phoneNumber: "1234567890",
      address: "Test Address",
      description: "Test Description",
      imgLogo: "https://test.com/image.jpg"
    };
    
    console.log('Attempting to create supplier with data:', testData);
    
    // Try creating the supplier
    const newSupplier = await prisma.supplier.create({
      data: testData,
      select: {
        id: true,
        name: true,
        contactEmail: true,
        createdAt: true
      }
    });
    
    console.log('✅ SUCCESS! Created supplier:', newSupplier);
    
    // Clean up - delete the test supplier
    await prisma.supplier.delete({
      where: { id: newSupplier.id }
    });
    
    console.log('✅ Test supplier cleaned up');
    
  } catch (error) {
    console.error('❌ ERROR in direct creation:', error);
    console.error('Error code:', error.code);
    console.error('Error meta:', error.meta);
  } finally {
    await prisma.$disconnect();
  }
}

testDirectCreation();
