const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const BACKEND_URL = 'http://localhost:4000';

async function createTestServiceAndTest() {
    console.log('=== Creating Test Service and Testing Deletion ===');

    try {
        // First, make sure we have a supplier
        let supplier = await prisma.supplier.findFirst();
        if (!supplier) {
            supplier = await prisma.supplier.create({
                data: {
                    name: 'Test Supplier for Service Testing',
                    email: 'test-service@example.com',
                    description: 'Test supplier for service deletion testing',
                    location: 'Test Location'
                }
            });
            console.log(`Created test supplier: ${supplier.name} (ID: ${supplier.id})`);
        }

        // Create a test service WITHOUT reviews
        const testService = await prisma.service.create({
            data: {
                name: 'Test Service Without Reviews',
                description: 'A test service without any reviews - should be safe to delete',
                price: 99.99,
                supplierId: supplier.id,
                location: 'Test Location'
            }
        });

        console.log(`Created test service: ${testService.name} (ID: ${testService.id})`);

        // Test dependencies check
        console.log('\n=== Checking Dependencies ===');
        const depResponse = await fetch(`${BACKEND_URL}/api/services/${testService.id}/dependencies`);
        if (depResponse.ok) {
            const dependencies = await depResponse.json();
            console.log('Dependencies:', dependencies);
            
            if (!dependencies.hasReviews) {
                console.log('✅ Service has no dependencies - safe to delete');
                
                // Test actual deletion
                console.log('\n=== Testing Deletion ===');
                const deleteResponse = await fetch(`${BACKEND_URL}/api/services/${testService.id}`, {
                    method: 'DELETE'
                });
                
                if (deleteResponse.ok) {
                    const result = await deleteResponse.json();
                    console.log('✅ Service deleted successfully:', result);
                } else {
                    const error = await deleteResponse.json();
                    console.log('❌ Error deleting service:', error);
                }
            } else {
                console.log('❌ Unexpected: Service should not have dependencies');
            }
        } else {
            console.log('❌ Error checking dependencies:', await depResponse.text());
        }

    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createTestServiceAndTest();
