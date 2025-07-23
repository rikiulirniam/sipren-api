FROM node:latest

WORKDIR /backend-sipren

COPY package.* ./
RUN npm install

COPY . .
CMD ["npm", "run", "dev"]

EXPOSE 1290