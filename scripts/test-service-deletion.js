const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Updated to use port 4000 for backend
const BACKEND_URL = 'http://localhost:4000';

async function checkBackendHealth() {
    try {
        const response = await fetch(`${BACKEND_URL}/health`);
        if (response.ok) {
            console.log(`✅ Backend found on port 4000`);
            return true;
        }
    } catch (error) {
        console.log('❌ Backend not found on port 4000');
        return false;
    }
}

async function testServiceDeletion() {
    try {
        console.log('=== Testing Service Deletion Safety ===\n');

        // First, find the backend
        const backendFound = await checkBackendHealth();
        if (!backendFound) {
            console.log('Cannot proceed without backend server');
            return;
        }

        // 1. First, let's see what services exist
        const services = await prisma.service.findMany({
            include: {
                reviews: true,
                supplier: true
            }
        });

        console.log(`Found ${services.length} services in the database:`);
        services.forEach(service => {
            console.log(`- Service ID ${service.id}: "${service.name}" (${service.reviews.length} reviews)`);
        });

        if (services.length === 0) {
            console.log('\nNo services found. Creating a test service...');
            
            // Find a supplier to associate with the service
            const suppliers = await prisma.supplier.findMany();
            if (suppliers.length === 0) {
                console.log('No suppliers found. Creating a test supplier...');
                const testSupplier = await prisma.supplier.create({
                    data: {
                        name: 'Test Supplier for Service Deletion',
                        email: 'test-service-deletion@example.com',
                        description: 'Test supplier created for service deletion testing',
                        location: 'Test Location'
                    }
                });
                console.log(`Created test supplier: ${testSupplier.name} (ID: ${testSupplier.id})`);
            }

            const supplier = suppliers.length > 0 ? suppliers[0] : await prisma.supplier.findFirst();
            
            // Create a test service
            const testService = await prisma.service.create({
                data: {
                    name: 'Test Service for Deletion',
                    description: 'A test service to verify safe deletion functionality',
                    price: 100.0,
                    supplierId: supplier.id,
                    location: 'Test Location'
                }
            });
            
            console.log(`Created test service: ${testService.name} (ID: ${testService.id})`);
              // Test deletion without dependencies
            console.log('\n=== Testing deletion of service without dependencies ===');
            const response1 = await fetch(`${BACKEND_URL}/api/services/${testService.id}/dependencies`);
            const dependencies1 = await response1.json();
            console.log('Dependencies check:', dependencies1);
            
            // Try to delete the service
            const deleteResponse1 = await fetch(`${BACKEND_URL}/api/services/${testService.id}`, {
                method: 'DELETE'
            });
            
            if (deleteResponse1.ok) {
                console.log('✅ Service without dependencies deleted successfully');
            } else {
                const error = await deleteResponse1.json();
                console.log('❌ Error deleting service:', error);
            }
        } else {
            // Use an existing service to test dependencies
            const serviceWithReviews = services.find(s => s.reviews.length > 0);
            
            if (serviceWithReviews) {
                console.log(`\n=== Testing deletion of service with dependencies (ID: ${serviceWithReviews.id}) ===`);
                  // Check dependencies
                const response = await fetch(`${BACKEND_URL}/api/services/${serviceWithReviews.id}/dependencies`);
                const dependencies = await response.json();
                console.log('Dependencies check:', dependencies);
                
                // Try to delete the service (should fail)
                const deleteResponse = await fetch(`${BACKEND_URL}/api/services/${serviceWithReviews.id}`, {
                    method: 'DELETE'
                });
                
                if (!deleteResponse.ok) {
                    const error = await deleteResponse.json();
                    console.log('✅ Deletion correctly blocked:', error.message);
                } else {
                    console.log('❌ Service was deleted despite having dependencies!');
                }
            } else {
                console.log('\n=== No services with reviews found. Testing with clean service ===');
                const cleanService = services[0];
                  // Check dependencies
                const response = await fetch(`${BACKEND_URL}/api/services/${cleanService.id}/dependencies`);
                const dependencies = await response.json();
                console.log('Dependencies check:', dependencies);
                
                if (!dependencies.hasReviews) {
                    console.log('\nThis service has no dependencies. Testing deletion...');
                    const deleteResponse = await fetch(`${BACKEND_URL}/api/services/${cleanService.id}`, {
                        method: 'DELETE'
                    });
                    
                    if (deleteResponse.ok) {
                        console.log('✅ Service without dependencies deleted successfully');
                    } else {
                        const error = await deleteResponse.json();
                        console.log('❌ Error deleting service:', error);
                    }
                }
            }
        }

    } catch (error) {
        console.error('Error during testing:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testServiceDeletion();
