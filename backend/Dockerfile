FROM node:12.16.2
# FROM node:latest

# default port is 5000, change as needed
EXPOSE 10201

### Set Enviroment Variables
# set Node(Backend) port, default 8001
# ARG VUE_APP_BACKEND_PORT=8001
# ENV VUE_APP_BACKEND_PORT=$VUE_APP_BACKEND_PORT
# set MONGO port, default 8003
# ARG MONGO_PORT=8003
# ENV MONGO_PORT=$MONGO_PORT

### Set WorkDir
WORKDIR /home/app/backend

### Copy package.json
COPY package*.json /home/app/backend/
### NPM Install
# RUN npm uninstall bcrypt
# RUN npm install bcrypt
RUN npm install
# RUN npm ci --only=production
# RUN npm audit fix

### Copy APP
COPY . /home/app/backend

### Run Node Server
# CMD npm run start
CMD npm start mongo:27017