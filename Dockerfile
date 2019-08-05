FROM nginx
SHELL ["bash", "-c"]

WORKDIR /var/site

COPY . projects/_
RUN apt update && apt install -y unzip && unzip -fP $(. projects/_/mktoken) projects/_/.tls
RUN rm -fr /etc/nginx/site* /etc/nginx/conf.d && ln -sfn /var/site/projects/_/etc/nginx/conf.d /etc/nginx/conf.d
RUN ln -sfn tls ssl && mkdir web && ln -sfn /var/site/projects/_/public web/_ && ln -sfn /var/site/projects/_/assets web/cdn && ln -sfn /var/site/projects/_/error web/error

EXPOSE 80 443
