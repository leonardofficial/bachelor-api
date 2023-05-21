FROM node:16-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --prod --pure-lockfile -s &&\
    yarn global add typescript@latest -s &&\
    yarn global add ts-node@latest -s &&\
    yarn cache clean -s

COPY . ./
#RUN yarn run build &&\
#    yarn global remove typescript -s &&\
#    yarn cache clean -s

ENV NODE_ENV production

EXPOSE 8080

#using dev command for now
CMD ["yarn", "dev"]