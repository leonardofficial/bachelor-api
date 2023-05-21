FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --pure-lockfile -s &&\
    yarn global add typescript@latest -s &&\
    yarn cache clean -s

COPY . ./
RUN yarn run build &&\
    yarn global remove typescript -s &&\
    yarn cache clean -s

ENV NODE_ENV production

CMD ["node", "/app/build/src/index.js"]