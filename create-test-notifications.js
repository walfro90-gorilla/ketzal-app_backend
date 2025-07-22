// Script para crear notificaciones de prueba
const BACKEND_URL = 'http://localhost:4000';
const USER_ID = 'cmddb57070000vlf8i0daf498'; // ID del usuario Walfre

async function createTestNotifications() {
    console.log('🧪 CREATING TEST NOTIFICATIONS\n');

    const testNotifications = [
        {
            userId: USER_ID,
            title: '¡Bienvenido a Ketzal!',
            message: 'Gracias por unirte a nuestra plataforma de turismo. Explora increíbles destinos y servicios.',
            type: 'SUCCESS',
            priority: 'NORMAL'
        },
        {
            userId: USER_ID,
            title: 'Nueva reserva confirmada',
            message: 'Tu reserva para el tour a Chichen Itzá ha sido confirmada. Fecha: 25 de julio, 2025.',
            type: 'INFO',
            priority: 'HIGH',
            actionUrl: '/planners'
        },
        {
            userId: USER_ID,
            title: 'Aprobación de proveedor',
            message: 'Tu solicitud para convertirte en proveedor está siendo revisada por nuestro equipo.',
            type: 'SUPPLIER_APPROVAL',
            priority: 'NORMAL'
        },
        {
            userId: USER_ID,
            title: '⚠️ Acción requerida',
            message: 'Tu perfil necesita actualización. Por favor completa tu información de contacto.',
            type: 'WARNING',
            priority: 'HIGH',
            actionUrl: '/profile'
        },
        {
            userId: USER_ID,
            title: '💰 AxoCoins ganadas',
            message: 'Has ganado 100 AxoCoins por tu reserva completada. ¡Úsalas en tu próximo viaje!',
            type: 'SUCCESS',
            priority: 'LOW',
            actionUrl: '/wallet'
        }
    ];

    try {
        let successCount = 0;
        
        for (const notif of testNotifications) {
            try {
                const response = await fetch(`${BACKEND_URL}/api/notifications`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(notif),
                });

                if (response.ok) {
                    const created = await response.json();
                    console.log(`✅ Creada: "${notif.title}" (ID: ${created.id})`);
                    successCount++;
                } else {
                    console.log(`❌ Error creando: "${notif.title}" - Status: ${response.status}`);
                }
            } catch (error) {
                console.log(`❌ Error creando: "${notif.title}" - ${error.message}`);
            }
            
            // Pequeña pausa entre requests
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        console.log(`\n🎉 Proceso completado: ${successCount}/${testNotifications.length} notificaciones creadas`);
        
        // Mostrar estadísticas
        console.log('\n📊 Obteniendo estadísticas actuales...');
        const statsResponse = await fetch(`${BACKEND_URL}/api/notifications/user/${USER_ID}/stats`);
        if (statsResponse.ok) {
            const stats = await statsResponse.json();
            console.log(`📈 Total: ${stats.total}, No leídas: ${stats.unread}, Leídas: ${stats.read}`);
        }

    } catch (error) {
        console.error('❌ Error general:', error.message);
    }
}

// Auto-run if script is executed directly
if (typeof window === 'undefined') {
    createTestNotifications().catch(console.error);
}

module.exports = { createTestNotifications };
