FROM alpine:3.18 as base

RUN apk add --no-cache yarn

WORKDIR /app/

COPY package.json yarn.lock /app/

RUN yarn && rm -rf /usr/local/share/.cache /tmp/*

EXPOSE 5000

CMD ["yarn", "dev"]
