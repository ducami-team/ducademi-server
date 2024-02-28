FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]


ENV DATABASE_HOST = ducademi.cbh607ibpkv8.ap-northeast-2.rds.amazonaws.com
ENV DATABASE_PORT = "3306"
ENV DATABASE_USER = "root"
ENV DATABASE_PASSWORD = "123qweasdzxc"!
ENV DATABASE_DATABASE = "ducademi"
