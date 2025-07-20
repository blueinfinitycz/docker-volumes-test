# Jednoduchy Nginx Dockerfile pro frontend
FROM nginx:alpine

# Kopirovat HTML soubory do nginx
COPY . /usr/share/nginx/html/

# Kopirovat vlastni nginx konfiguraci (pokud existuje)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vystavit port 8080
EXPOSE 8080

# Nginx se spusti automaticky
