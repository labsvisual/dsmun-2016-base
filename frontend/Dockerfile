FROM httpd:2.4

RUN     apt-get update && apt-get upgrade -y

COPY    ./src /usr/local/apache2/htdocs/
COPY    ./conf/httpd.conf /usr/local/apache2/conf/httpd.conf

RUN     cd /usr/local/apache2/htdocs/ && rm -rf app/controllers app/services
RUN     cd /usr/local/apache2/htdocs/ && rm -rf .codekit-cache

EXPOSE  80
