FROM node:17 AS builder

ARG BRANDNAME

ARG BRANDNAME_VERSION

RUN curl https://static.dev.liber.casa/build/environments/env.json -o env.json

#RUN env.json to ENV

USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node package*.json ./

COPY --chown=node yarn.lock ./

RUN yarn install

RUN yarn add @liber-biz/crpw-ui-kit-"$BRANDNAME"@"$BRANDNAME_VERSION"

# Bundle app source code
COPY --chown=node . .

RUN yarn build

FROM nginxinc/nginx-unprivileged:1.21.6

ENV CORS_ALLOWED_ORIGIN api.liber.casa
ENV EXPIRES 30d

WORKDIR /app

COPY --from=builder /home/node/app/dist /app

COPY nginx/conf.d/default.conf.template /etc/nginx/templates/default.conf.template

