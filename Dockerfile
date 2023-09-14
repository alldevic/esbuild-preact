FROM alpine:3.18 as base

RUN apk add --no-cache yarn

WORKDIR /app/

COPY package.json yarn.lock /app/

RUN yarn && rm -rf /usr/local/share/.cache /tmp/*


FROM base as dev

ENTRYPOINT ["yarn", "dev"]


FROM base as prod

COPY . .

RUN yarn build && rm -rf /usr/local/share/.cache /tmp/*
