FROM nginx
SHELL ["bash", "-c"]
WORKDIR /usr/share/nginx
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y vim git unzip curl jq \
 tmux zip openssh-client net-tools dnsutils iputils-ping netcat procps
COPY . .
RUN rm -fr /etc/nginx/conf.d \
 && mv nginx.conf conf.d /etc/nginx \
 && . ssl-keygen \
 && openssl dhparam 256 > tls/dhparam.pem
RUN rm -fr /var/lib/apt/lists/*
EXPOSE 80 443
CMD ["./cmd"]
