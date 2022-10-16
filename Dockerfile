FROM node:14.16.1

# install needed nom stuff
RUN npm i -g @nestjs/cli typescript ts-node


# copy package.json into continaer
COPY package*.json /tmp/app/

# go inside tmp/app and run npm i
RUN cd /tmp/app && npm install

# copy all to /usr/src/app folder
COPY . /usr/src/app

# copy over node_modules too
RUN cp -a /tmp/app/node_modules /usr/src/app

# copy scripts from local to /opt folder and remove carige returne
COPY ./wait-for-it.sh /opt/wait-for-it.sh
COPY ./startup.dev.sh /opt/startup.dev.sh
RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/startup.dev.sh

# set working dir
WORKDIR /usr/src/app

# update .env
RUN rm -rf .env && cp env-example .env

# build the app
RUN npm run build

# run script
CMD ["/bin/bash", "/opt/startup.dev.sh"]