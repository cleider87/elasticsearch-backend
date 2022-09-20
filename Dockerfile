FROM node:lts

WORKDIR /app

COPY ./package.json /app/

RUN npm install --verbose

RUN npm install --no-package-lock

COPY . /app/

EXPOSE 3000

CMD ["npm", "run", "start:prod"]