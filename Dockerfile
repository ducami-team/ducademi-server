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

ENV PORT=8080
ENV DATABASE_HOST = 172.17.0.2
ENV DATABASE_PORT = 3306
ENV DATABASE_USER = my-mysql-container
ENV DATABASE_PASSWORD = my-secret-DATABASE_PASSWORD
ENV DATABASE_DATABASE = ducademi
