FROM nginx
SHELL ["bash", "-c"]

WORKDIR /var/site

COPY . projects/_
COPY nginx.conf /etc/nginx/nginx.conf
RUN apt update && apt install -y vim git unzip curl
RUN rm -fr /etc/nginx/site* /etc/nginx/conf.d && ln -sfn /var/site/projects/_/etc/nginx/conf.d /etc/nginx/conf.d
RUN ln -sfn tls ssl && mkdir web && ln -sfn /var/site/projects/_/public web/_ && ln -sfn /var/site/projects/_/assets web/cdn && ln -sfn /var/site/projects/_/error web/error

EXPOSE 80 443
CMD ["bash", "-c", ". projects/_/cmd"]
