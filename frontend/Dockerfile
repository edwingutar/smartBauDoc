# Entwicklungs-Dockerfile (für Hot-Reload)
FROM node:20 AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]

# Produktions-Dockerfile (statisches Build mit nginx)
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]