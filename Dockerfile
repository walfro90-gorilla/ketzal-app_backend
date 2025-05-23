# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala TODAS las dependencias (incluyendo dev) para poder construir
RUN npm install

# Copia el resto del código (incluye prisma/schema.prisma)
COPY . .

# Genera el cliente de Prisma (ahora sí existe el schema)
RUN npx prisma generate

# Construye el proyecto
RUN npm run build

# Elimina dependencias de desarrollo para producción (opcional)
RUN npm prune --production

# Expone el puerto (ajusta si usas otro)
EXPOSE 4000

# Comando para iniciar la app
CMD ["npm", "start"]
