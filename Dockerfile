FROM node:17 AS builder

# the token to fetch internal projects
ARG GITHUB_TOKEN
# the version from github. tag or commit hash
ARG VERSION

ARG BRANDNAME="liber"
ARG BRANDNAME_VERSION="0.1.45"
ARG BRAND_CONFIGURATION_HOSTNAME="conf.middleware.dev.k8s.domain"

# configure git with token
RUN git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"

ARG NPM_TOKEN

USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY --chown=node package*.json ./

COPY --chown=node yarn.lock ./

COPY --chown=node .npmrc ./

#RUN curl http://$BRAND_CONFIGURATION_HOSTNAME/tenant-config/$BRANDNAME -o env.json
RUN curl -H "Host: $BRAND_CONFIGURATION_HOSTNAME" http://172.31.27.226/tenant-config/$BRANDNAME -o env.json

RUN yarn install

RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc

RUN yarn add @liber-biz/crpw-ui-kit-$BRANDNAME@$BRANDNAME_VERSION

RUN rm -f ~/.npmrc

# Bundle app source code
COPY --chown=node . .

RUN yarn lint

RUN yarn test

RUN yarn env:from:json

RUN yarn build

FROM nginxinc/nginx-unprivileged:1.21.6

ENV CORS_ALLOWED_ORIGIN api.liber.casa
ENV EXPIRES 30d

WORKDIR /app

COPY --from=builder /home/node/app/dist /app

COPY nginx/conf.d/default.conf.template /etc/nginx/templates/default.conf.template

