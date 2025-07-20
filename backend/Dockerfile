FROM node:18-alpine
# Nastavit pracovní adresář
WORKDIR /app
# Kopírovat package.json a nainstalovat závislosti
COPY package*.json ./
RUN npm install --production
# Kopírovat zdrojový kód
COPY . .
# Vystavit port 5000
EXPOSE 5000
# Spustit server
CMD ["node", "app.js"]