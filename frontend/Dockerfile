FROM httpd:2.4

RUN     sudo apt-get update && sudo apt-get upgrade -y

COPY    ./src /usr/local/apache2/htdocs/

RUN     cd /usr/local/apache2/htdocs/ && rm -rf app/controllers app/services
RUN     cd /usr/local/apache2/htdocs/ && rm -rf .codekit-cache

EXPOSE  80
