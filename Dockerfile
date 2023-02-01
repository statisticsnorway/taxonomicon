FROM node:19-alpine3.16 as build-stage

WORKDIR /app

COPY package*.json /app/
RUN yarn install --production

COPY . /app/

RUN npx next telemetry disable

RUN yarn run build

EXPOSE 9080

# with auth headers, header size is considerably increased
# testing if this will fix the problem with BIP
# TODO: consider multi-container pod config (sidecar)
ENV NODE_OPTIONS "--max-http-header-size=16834"
ENV NODE_ENV "production"
ENV PORT 9080

CMD [ "yarn", "start" ]