FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /usr/app

COPY . .

RUN yarn install

CMD ["yarn", "start"]
