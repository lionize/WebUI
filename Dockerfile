FROM nginx:stable

COPY ./build/ /var/www
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx -g 'daemon off;'"]