# Pull the latest base image from the Node.js category
# We're using v5.3.0
FROM    node:5.3.0

RUN     mkdir -p /usr/src/app

RUN     apt-get update -y && apt-get upgrade -y

RUN     apt-get install -y supervisor
RUN     mkdir -p /var/log/supervisor

COPY    package.json /usr/src/app/package.json

# THIS IS A BAD BAD HACK
RUN     npm set registry http://registry.npmjs.org

RUN     cd /usr/src/app && npm install --verbose

COPY    supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY    . /usr/src/app

# RUN     cd /usr/src/app/src

WORKDIR /usr/src/app

EXPOSE  3345

CMD        [ "/usr/bin/supervisord" ]
