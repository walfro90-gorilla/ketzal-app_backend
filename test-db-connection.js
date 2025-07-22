// Test de conectividad a Supabase desde el backend
const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
    console.log('🔍 Testing database connection...\n');
    
    const prisma = new PrismaClient();
    
    try {
        console.log('🔄 Connecting to database...');
        await prisma.$connect();
        console.log('✅ Database connection successful!');
        
        console.log('\n🔄 Testing query...');
        const userCount = await prisma.user.count();
        console.log(`📊 Found ${userCount} users in database`);
        
        console.log('\n✅ Database is working correctly!');
        
    } catch (error) {
        console.error('❌ Database connection failed:');
        console.error('   Error code:', error.code);
        console.error('   Error message:', error.message);
        
        if (error.code === 'P1001') {
            console.log('\n💡 Suggestions:');
            console.log('   1. Check if your internet connection is working');
            console.log('   2. Verify that Supabase database is running');
            console.log('   3. Confirm DATABASE_URL is correct in .env file');
        }
    } finally {
        await prisma.$disconnect();
        console.log('\n🔌 Database connection closed');
    }
}

// Auto-run if script is executed directly
if (typeof window === 'undefined') {
    testDatabaseConnection().catch(console.error);
}

module.exports = { testDatabaseConnection };
