// Test script para probar la funcionalidad de planners
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testPlannersAPI() {
  console.log('🧪 Probando funcionalidad de Planners...\n');

  try {
    // 1. Verificar estructura de la base de datos
    console.log('1️⃣ Verificando estructura de la BD...');
    
    const userCount = await prisma.user.count();
    console.log(`   ✅ Usuarios en BD: ${userCount}`);
    
    const plannerCount = await prisma.travelPlanner.count();
    console.log(`   ✅ Planners existentes: ${plannerCount}`);

    // 2. Obtener o crear usuario de prueba
    console.log('\n2️⃣ Configurando usuario de prueba...');
    
    let testUser = await prisma.user.findFirst({
      where: { email: 'test@planners.com' }
    });

    if (!testUser) {
      testUser = await prisma.user.create({
        data: {
          email: 'test@planners.com',
          name: 'Test User Planners',
          password: 'test123',
          role: 'admin'
        }
      });
      console.log('   ✅ Usuario de prueba creado');
    } else {
      console.log('   ✅ Usuario de prueba encontrado');
    }

    // 3. Crear planner de prueba
    console.log('\n3️⃣ Creando planner de prueba...');
    
    const testPlanner = await prisma.travelPlanner.create({
      data: {
        userId: testUser.id,
        name: 'Viaje a Cancún 2025',
        destination: 'Cancún, México',
        startDate: new Date('2025-08-01'),
        endDate: new Date('2025-08-07'),
        status: 'PLANNING',
        isPublic: false,
        totalMXN: 0,
        totalAxo: 0,
      },
      include: {
        items: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    });

    console.log('   ✅ Planner creado:', {
      id: testPlanner.id,
      name: testPlanner.name,
      destination: testPlanner.destination,
      owner: testPlanner.user.name
    });

    // 4. Obtener servicio o producto de prueba para agregar al planner
    console.log('\n4️⃣ Buscando servicios/productos para agregar...');
    
    const service = await prisma.service.findFirst();
    const product = await prisma.product.findFirst();
    
    console.log('   ✅ Servicios disponibles:', service ? service.name : 'Ninguno');
    console.log('   ✅ Productos disponibles:', product ? product.name : 'Ninguno');

    // 5. Agregar item al planner si hay servicios/productos
    if (service || product) {
      console.log('\n5️⃣ Agregando item al planner...');
      
      const plannerItem = await prisma.plannerItem.create({
        data: {
          plannerId: testPlanner.id,
          serviceId: service?.id,
          productId: product?.id,
          quantity: 2,
          priceMXN: service?.price || product?.price || 1500,
          priceAxo: (service?.priceAxo || product?.priceAxo || 1350),
          selectedDate: new Date('2025-08-02'),
          notes: 'Item de prueba agregado automáticamente'
        },
        include: {
          service: true,
          product: true,
          planner: true
        }
      });

      console.log('   ✅ Item agregado:', {
        id: plannerItem.id,
        serviceName: plannerItem.service?.name,
        productName: plannerItem.product?.name,
        quantity: plannerItem.quantity,
        totalMXN: plannerItem.priceMXN * plannerItem.quantity
      });

      // 6. Actualizar totales del planner
      console.log('\n6️⃣ Actualizando totales del planner...');
      
      const updatedPlanner = await prisma.travelPlanner.update({
        where: { id: testPlanner.id },
        data: {
          totalMXN: plannerItem.priceMXN * plannerItem.quantity,
          totalAxo: (plannerItem.priceAxo || 0) * plannerItem.quantity,
          updatedAt: new Date()
        }
      });

      console.log('   ✅ Totales actualizados:', {
        totalMXN: updatedPlanner.totalMXN,
        totalAxo: updatedPlanner.totalAxo
      });
    }

    // 7. Listar todos los planners del usuario
    console.log('\n7️⃣ Listando planners del usuario...');
    
    const userPlanners = await prisma.travelPlanner.findMany({
      where: { userId: testUser.id },
      include: {
        items: {
          include: {
            service: true,
            product: true
          }
        },
        _count: {
          select: { items: true }
        }
      }
    });

    console.log('   ✅ Planners encontrados:', userPlanners.length);
    userPlanners.forEach(planner => {
      console.log(`   📋 ${planner.name} - ${planner._count.items} items - $${planner.totalMXN} MXN`);
    });

    console.log('\n🎉 ¡Prueba completada exitosamente!');
    console.log('\n📌 URLs de la API creada:');
    console.log('   GET    /planners              - Obtener planners del usuario');
    console.log('   POST   /planners              - Crear nuevo planner');
    console.log('   GET    /planners/:id          - Obtener planner específico');
    console.log('   PATCH  /planners/:id          - Actualizar planner');
    console.log('   DELETE /planners/:id          - Eliminar planner');
    console.log('   POST   /planners/items        - Agregar item al planner');
    console.log('   DELETE /planners/items/:itemId - Remover item del planner');
    console.log('   GET    /planners/:id/stats    - Estadísticas del planner');

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la prueba
testPlannersAPI();
