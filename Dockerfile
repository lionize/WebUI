FROM nginx:stable

COPY ./build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

ENV PORT 80
ENV SERVER_NAME _

CMD /usr/sbin/nginx -g 'daemon off;'