FROM nginx
SHELL ["bash", "-c"]
WORKDIR /usr/share/nginx
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y vim git unzip curl jq \
 tmux zip openssh-client net-tools dnsutils iputils-ping netcat procps
COPY . .
COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -fr /etc/nginx/site* /etc/nginx/conf.d \
 && ln -sfn /usr/share/nginx/etc/nginx/conf.d /etc/nginx/conf.d
RUN . ssl-keygen \
 && cp tls/wildcard.jsx.jp.cert tls/cert.pem \
 && cp tls/wildcard.jsx.jp.key tls/cert.key \
 && openssl dhparam 256 > tls/dhparam.pem
RUN rm -fr /var/lib/apt/lists/*
EXPOSE 80 443
CMD ["bash", "-c", ". cmd"]
