# Usa una imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm ci --only=production

# Copia el resto del código
COPY . .

# Construye el proyecto
RUN npm run build

# Expone el puerto (ajusta si usas otro)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
