// Quick test to get a real user ID for notifications testing
const BACKEND_URL = 'http://localhost:4000';

async function getTestUserId() {
    console.log('🔍 Getting a real user ID from the database...\n');

    try {
        // Get users from the backend
        const response = await fetch(`${BACKEND_URL}/api/users`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const users = await response.json();
        console.log(`📊 Found ${users.length} users in the database`);
        
        if (users.length > 0) {
            const testUser = users[0];
            console.log(`✅ Using user: ${testUser.name} (${testUser.email})`);
            console.log(`🆔 User ID: ${testUser.id}`);
            return testUser.id;
        } else {
            console.log('❌ No users found in database');
            return null;
        }
        
    } catch (error) {
        console.error('❌ Error fetching users:', error.message);
        return null;
    }
}

// Auto-run if script is executed directly
if (typeof window === 'undefined') {
    getTestUserId().catch(console.error);
}

module.exports = { getTestUserId };
