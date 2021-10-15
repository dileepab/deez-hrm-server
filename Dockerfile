# Check out https://hub.docker.com/_/node to select a new base image
FROM node:8.9 as nodeBuilder
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]
