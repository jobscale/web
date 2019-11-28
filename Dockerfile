FROM nginx
SHELL ["bash", "-c"]
WORKDIR /var/site
ENV DEBIAN_FRONTEND noninteractive
COPY . projects/_
COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf
RUN apt update && apt install -y vim git unzip curl
RUN rm -fr /etc/nginx/site* /etc/nginx/conf.d \
 && ln -sfn /var/site/projects/_/etc/nginx/conf.d /etc/nginx/conf.d
RUN ln -sfn tls ssl
EXPOSE 80 443
CMD ["bash", "-c", ". projects/_/cmd"]
