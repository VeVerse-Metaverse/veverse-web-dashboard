# Builder
FROM node:latest as build-stage

RUN yarn global add http-server

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY ./ .
RUN yarn build

# Runtime
#FROM nginx:1.23.1-alpine
#RUN mkdir /app
#COPY --from=build-stage /app/dist /app
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY prepare-env.sh /docker-entrypoint.d/10-prepare-env.sh
#RUN chmod +x /docker-entrypoint.d/10-prepare-env.sh
#EXPOSE 8080

CMD ["http-server", "dist", "-c-1", "-p", "8080"]

#CMD [ "/bin/bash", "-c", "while true; do echo ok; sleep 10;done" ]
