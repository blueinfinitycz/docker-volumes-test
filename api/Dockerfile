FROM node:18-alpine
# Nastavit pracovní adresář
WORKDIR /app
# Kopírovat package.json a nainstalovat závislosti
COPY package*.json ./
RUN npm install --production
# Kopírovat zdrojový kód
COPY . .
# Vystavit port 3000
EXPOSE 3000
# Spustit server
CMD ["node", "server.js"]