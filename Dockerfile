FROM node:lts-slim AS node-builder

COPY . /sleepwalker_frontend
WORKDIR /sleepwalker_frontend

RUN npm i
RUN npm run build

FROM nginx:stable

COPY --from=node-builder /sleepwalker_frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=node-builder /sleepwalker_frontend/dist /usr/share/nginx/html
