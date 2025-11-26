FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 8080

# docker build -t rupesh1997/frontend:1.0.0 -f ../docker/frontend/Dockerfile .
# docker run -d -p 8080:8080 --name frontend rupesh1997/frontend:1.0.0