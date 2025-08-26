import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  ParseIntPipe,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

// Type guard para verificar errores de Prisma
function isPrismaError(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error;
}

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    console.log(
      "Backend received request with DTO:",
      JSON.stringify(createServiceDto, null, 2)
    );
    try {
      const service = await this.servicesService.create(createServiceDto);
      return {
        message: "Servicio creado exitosamente",
        data: service,
      };
    } catch (error) {
      if (isPrismaError(error)) {
        // Foreign key constraint failed
        if (error.code === "P2003") {
          throw new BadRequestException(
            "El proveedor (supplier, hotel, or transport) no existe."
          );
        }
        // Unique constraint failed
        if (error.code === "P2002") {
          throw new ConflictException("Ya existe un servicio con este nombre.");
        }
      }
      console.error("Error creating service in controller:", error);
      throw new InternalServerErrorException("No se pudo crear el servicio.");
    }
  }

  @Get()
  findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("search") search?: string,
    @Query("hasTransport") hasTransport?: string
  ) {
    // Si hay parámetros de admin, usar método especializado
    if (page || limit || search || hasTransport) {
      const pageNum = parseInt(page || "1");
      const limitNum = parseInt(limit || "10");

      if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 1 || limitNum < 1) {
        throw new BadRequestException(
          "Los parámetros page y limit deben ser números positivos"
        );
      }

      return this.servicesService.findAllWithBusInfo({
        page: pageNum,
        limit: limitNum,
        search,
        hasTransport:
          hasTransport === "true"
            ? true
            : hasTransport === "false"
              ? false
              : undefined,
      });
    }

    return this.servicesService.findAll();
  }

  @Get("with-reviews")
  findAllWithReviewStats() {
    return this.servicesService.findAllWithReviewStats();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }
  @Get(":id/dependencies")
  getServiceDependencies(@Param("id") id: string) {
    return this.servicesService.getServiceDependencies(+id);
  }

  @Get(":id/bus-transport")
  async getBusTransportConfig(@Param("id", ParseIntPipe) id: number) {
    const config = await this.servicesService.getBusTransportConfig(id);
    if (!config) {
      throw new NotFoundException("Servicio no encontrado");
    }
    return config;
  }

  @Put(":id/bus-transport")
  async updateBusTransportConfig(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateBusTransportDto: any
  ) {
    try {
      const updatedService =
        await this.servicesService.updateBusTransportConfig(
          id,
          updateBusTransportDto
        );

      return {
        message: "Configuración actualizada exitosamente",
        service: updatedService,
      };
    } catch (error) {
      // Usar type guard para verificar errores de Prisma
      if (isPrismaError(error) && error.code === "P2025") {
        throw new NotFoundException("Servicio no encontrado");
      }
      throw error;
    }
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
