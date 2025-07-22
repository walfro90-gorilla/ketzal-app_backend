// Test script for Notifications CRUD
const BACKEND_URL = 'http://localhost:4000';

async function testNotificationsCRUD() {
    console.log('🧪 TESTING NOTIFICATIONS CRUD\n');

    try {
        // 1. Test GET /notifications (should return empty array initially)
        console.log('1️⃣ Testing GET /notifications...');
        const getAllResponse = await fetch(`${BACKEND_URL}/api/notifications`);
        const allNotifications = await getAllResponse.json();
        console.log(`   ✅ Status: ${getAllResponse.status}`);
        console.log(`   📊 Total notifications: ${Array.isArray(allNotifications) ? allNotifications.length : 'N/A'}`);

        // 2. Test POST /notifications (create notification)
        console.log('\n2️⃣ Testing POST /notifications...');
        const testNotification = {
            userId: 'cmddb57070000vlf8i0daf498', // Real user ID from database
            title: 'Test Notification',
            message: 'This is a test notification created by the test script',
            type: 'INFO',
            priority: 'NORMAL'
        };

        const createResponse = await fetch(`${BACKEND_URL}/api/notifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testNotification),
        });

        if (createResponse.ok) {
            const createdNotification = await createResponse.json();
            console.log(`   ✅ Status: ${createResponse.status}`);
            console.log(`   📝 Created notification ID: ${createdNotification.id}`);
            
            // 3. Test GET /notifications/:id
            console.log('\n3️⃣ Testing GET /notifications/:id...');
            const getOneResponse = await fetch(`${BACKEND_URL}/api/notifications/${createdNotification.id}`);
            const foundNotification = await getOneResponse.json();
            console.log(`   ✅ Status: ${getOneResponse.status}`);
            console.log(`   📋 Found notification: ${foundNotification.title}`);

            // 4. Test PATCH /notifications/:id/mark-read
            console.log('\n4️⃣ Testing PATCH /notifications/:id/mark-read...');
            const markReadResponse = await fetch(`${BACKEND_URL}/api/notifications/${createdNotification.id}/mark-read`, {
                method: 'PATCH',
            });
            const markedNotification = await markReadResponse.json();
            console.log(`   ✅ Status: ${markReadResponse.status}`);
            console.log(`   ✅ Is read: ${markedNotification.isRead}`);

            // 5. Test GET /notifications/user/:userId
            console.log('\n5️⃣ Testing GET /notifications/user/:userId...');
            const userNotificationsResponse = await fetch(`${BACKEND_URL}/api/notifications/user/${testNotification.userId}`);
            const userNotifications = await userNotificationsResponse.json();
            console.log(`   ✅ Status: ${userNotificationsResponse.status}`);
            console.log(`   📊 User notifications count: ${Array.isArray(userNotifications) ? userNotifications.length : 'N/A'}`);

            // 6. Test GET /notifications/user/:userId/stats
            console.log('\n6️⃣ Testing GET /notifications/user/:userId/stats...');
            const statsResponse = await fetch(`${BACKEND_URL}/api/notifications/user/${testNotification.userId}/stats`);
            const stats = await statsResponse.json();
            console.log(`   ✅ Status: ${statsResponse.status}`);
            console.log(`   📈 Stats:`, stats);

            // 7. Test DELETE /notifications/:id
            console.log('\n7️⃣ Testing DELETE /notifications/:id...');
            const deleteResponse = await fetch(`${BACKEND_URL}/api/notifications/${createdNotification.id}`, {
                method: 'DELETE',
            });
            console.log(`   ✅ Status: ${deleteResponse.status}`);
            console.log(`   🗑️ Notification deleted successfully`);

        } else {
            const error = await createResponse.json();
            console.log(`   ❌ Status: ${createResponse.status}`);
            console.log(`   ❌ Error:`, error);
        }

        console.log('\n🎉 CRUD TEST COMPLETED!');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.log('\n💡 Make sure the backend is running on port 4000');
    }
}

// Auto-run if script is executed directly
if (typeof window === 'undefined') {
    testNotificationsCRUD().catch(console.error);
}

module.exports = { testNotificationsCRUD };
