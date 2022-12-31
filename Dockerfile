FROM node:16.15 as base
WORKDIR /app
COPY package.json . /app/


FROM base as development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","run","start:dev"]

FROM base as production

RUN npm install --only production
COPY . .
EXPOSE 8000
CMD ["npm","start"]