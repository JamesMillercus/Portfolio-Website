# Define from nginx images
FROM nginx:latest

RUN rm /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/conf.d/

RUN sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt