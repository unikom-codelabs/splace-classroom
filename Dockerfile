FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .


RUN yarn install

# build 
RUN yarn build

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]
