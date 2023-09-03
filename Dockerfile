FROM node:18-alpine as builder

WORKDIR /user/app

COPY ./src ./src
COPY ./prisma ./prisma
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./schema.graphql ./schema.graphql
COPY ./codegen.json ./codegen.json

RUN npm install
RUN npm run codegen
RUN npm run build

CMD npx prisma migrate dev

FROM node:18-alpine

LABEL title="Group Chat API"

ARG PORT=
ENV SERVICE_PORT=${PORT}

WORKDIR /user/app

COPY --from=builder ./user/app/dist ./dist
COPY --from=builder ./user/app/prisma ./prisma
COPY --from=builder ./user/app/package.json ./package.json
COPY --from=builder ./user/app/package-lock.json ./package-lock.json
COPY --from=builder ./user/app/schema.graphql ./schema.graphql

RUN npm install --production

EXPOSE ${SERVICE_PORT} 

CMD npm run start:migrate:prod