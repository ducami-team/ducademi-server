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

# ENV PORT=8080
# ENV DATABASE_HOST = 192.168.35.139
# ENV DATABASE_PORT = 3306
# ENV DATABASE_USER = root
# ENV DATABASE_PASSWORD = 123qweasdzxc!
# ENV DATABASE_DATABASE = ducademi
