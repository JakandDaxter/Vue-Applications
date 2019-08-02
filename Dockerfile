# build stage
FROM node:9.11.1-alpine as build-stage
RUN npm install -g yarn
RUN chmod +x /usr/local/lib/node_modules/yarn/bin/yarn.js
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

# production stage
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
