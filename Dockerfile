FROM node:lts-alpine

WORKDIR /app

COPY ./package.json /app/

RUN npm install --verbose

RUN npm install --no-package-lock

COPY . /app/

EXPOSE 3001

CMD ["npm", "run", "start:prod"]