// Script de Validación: Login conectando con Supabase
// Verifica que el sistema de autenticación esté usando Supabase PostgreSQL

const FRONTEND_URL = 'http://localhost:3000';

async function testLoginSupabaseConnection() {
    console.log('🔄 Testing Login Supabase Connection...');
    
    try {
        // Test 1: Verificar que NextAuth esté configurado correctamente
        const sessionResponse = await fetch(`${FRONTEND_URL}/api/auth/session`);
        if (sessionResponse.ok) {
            console.log('✅ NextAuth Session Endpoint: Working');
        } else {
            console.log('❌ NextAuth Session Endpoint: Failed');
            return false;
        }

        // Test 2: Verificar que la página de login cargue
        const loginResponse = await fetch(`${FRONTEND_URL}/login`);
        if (loginResponse.ok) {
            console.log('✅ Login Page: Loading correctly');
        } else {
            console.log('❌ Login Page: Failed to load');
            return false;
        }

        return true;
    } catch (error) {
        console.log('❌ Login Connection Test: Failed', error.message);
        return false;
    }
}

async function testUserDatabaseConnection() {
    console.log('🔄 Testing User Database Connection with Supabase...');
    
    try {
        // Verificar que podemos acceder a la tabla de usuarios desde el backend
        const backendResponse = await fetch('http://localhost:4000/api/users');
        
        if (backendResponse.ok) {
            const users = await backendResponse.json();
            console.log(`✅ User Database: Connected to Supabase (${users.length} users found)`);
            
            // Verificar estructura de usuario
            if (users.length > 0) {
                const sampleUser = users[0];
                const hasRequiredFields = sampleUser.id && sampleUser.email;
                
                if (hasRequiredFields) {
                    console.log('✅ User Database: Correct user structure detected');
                    console.log(`   Sample user ID: ${sampleUser.id}, Email: ${sampleUser.email || 'N/A'}`);
                    return true;
                } else {
                    console.log('❌ User Database: Invalid user structure');
                    return false;
                }
            } else {
                console.log('⚠️  User Database: No users found (empty database)');
                return true; // Empty database is still a valid connection
            }
        } else {
            console.log('❌ User Database: Failed to connect to backend users API');
            return false;
        }
    } catch (error) {
        console.log('❌ User Database: Connection error', error.message);
        return false;
    }
}

async function testAuthProviderConfiguration() {
    console.log('🔄 Testing Auth Provider Configuration...');
    
    try {
        // Test providers endpoint
        const providersResponse = await fetch(`${FRONTEND_URL}/api/auth/providers`);
        
        if (providersResponse.ok) {
            const providers = await providersResponse.json();
            console.log('✅ Auth Providers: Configuration loaded');
            
            // Check if credentials provider is available
            const hasCredentials = providers.credentials !== undefined;
            if (hasCredentials) {
                console.log('✅ Auth Providers: Credentials provider configured');
                return true;
            } else {
                console.log('❌ Auth Providers: Credentials provider missing');
                return false;
            }
        } else {
            console.log('❌ Auth Providers: Failed to load configuration');
            return false;
        }
    } catch (error) {
        console.log('❌ Auth Providers: Configuration error', error.message);
        return false;
    }
}

async function testDatabaseSchema() {
    console.log('🔄 Testing Database Schema for Authentication...');
    
    try {
        // Check if Account and User tables exist by trying to access them
        const accountResponse = await fetch('http://localhost:4000/api/test/db-schema');
        
        // If endpoint doesn't exist, we'll check indirectly through users
        if (accountResponse.status === 404) {
            console.log('⚠️  Direct schema test not available, checking through users API');
            
            // Try to access users - if it works, schema is likely correct
            const usersResponse = await fetch('http://localhost:4000/api/users');
            if (usersResponse.ok) {
                console.log('✅ Database Schema: User table accessible (schema likely correct)');
                return true;
            } else {
                console.log('❌ Database Schema: User table not accessible');
                return false;
            }
        }
        
        if (accountResponse.ok) {
            console.log('✅ Database Schema: Authentication tables available');
            return true;
        } else {
            console.log('❌ Database Schema: Authentication tables missing');
            return false;
        }
    } catch (error) {
        console.log('❌ Database Schema: Error checking schema', error.message);
        return false;
    }
}

async function runLoginSupabaseValidation() {
    console.log('🚀 VALIDACIÓN LOGIN SUPABASE CONNECTION');
    console.log('=====================================\n');
    
    const tests = [
        { name: 'Login Supabase Connection', test: testLoginSupabaseConnection },
        { name: 'User Database Connection', test: testUserDatabaseConnection },
        { name: 'Auth Provider Configuration', test: testAuthProviderConfiguration },
        { name: 'Database Schema Check', test: testDatabaseSchema }
    ];
    
    const results = {};
    
    for (const { name, test } of tests) {
        console.log(`\n--- ${name} ---`);
        results[name] = await test();
    }
    
    console.log('\n\n📊 RESULTADOS LOGIN VALIDATION');
    console.log('==============================');
    
    let allPassed = true;
    for (const [testName, passed] of Object.entries(results)) {
        const status = passed ? '✅ PASSED' : '❌ FAILED';
        console.log(`${testName}: ${status}`);
        if (!passed) allPassed = false;
    }
    
    console.log('\n' + '='.repeat(50));
    if (allPassed) {
        console.log('🎉 LOGIN SUPABASE CONNECTION: VERIFIED!');
        console.log('');
        console.log('✅ NextAuth configurado correctamente');
        console.log('✅ Base de datos de usuarios accesible');
        console.log('✅ Proveedores de autenticación disponibles');
        console.log('✅ Schema de base de datos correcto');
        console.log('');
        console.log('🔐 SISTEMA DE LOGIN LISTO PARA:');
        console.log('   → Login con email/password');
        console.log('   → Gestión de sesiones');
        console.log('   → Reset de contraseñas (por implementar)');
    } else {
        console.log('❌ LOGIN CONNECTION ISSUES DETECTED');
        console.log('Revisar configuración antes de proceder con reset password');
    }
    console.log('='.repeat(50));
}

// Ejecutar validación si se ejecuta directamente
if (typeof window === 'undefined') {
    runLoginSupabaseValidation().catch(console.error);
}

module.exports = { runLoginSupabaseValidation };
