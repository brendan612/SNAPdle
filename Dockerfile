FROM node:20.12.2
RUN groupadd -g 500 container && useradd -r -u 500 -d /app -g container container
ADD . /app/
RUN chown -R container:container /app
RUN chmod -R 755 /app
WORKDIR /app
RUN apt-get -y update && apt-get -y install procps
RUN npm install -g pm2
RUN npm ci
USER container
RUN npm run build
WORKDIR /app/server
CMD [ "pm2", "start", "ecosystem.config.js", "--no-daemon" ]
