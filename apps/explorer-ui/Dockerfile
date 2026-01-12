FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine
RUN rm -rf /usr/share/nginx/html

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173