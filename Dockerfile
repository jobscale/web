FROM nginx
SHELL ["bash", "-c"]
WORKDIR /usr/share/nginx
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y vim git unzip curl jq \
 tmux zip openssh-client net-tools dnsutils iputils-ping netcat ncat procps
COPY . .
RUN rm -fr /etc/nginx/*conf* \
 && ln -sfn $(pwd)/nginx.conf /etc/nginx \
 && ln -sfn $(pwd)/conf.d /etc/nginx \
 && ln -sfn ../proxy.pac html/proxy.pac \
 && ln -sfn ../wpad.dat html/wpad.dat
RUN rm -fr /var/lib/apt/lists/*
EXPOSE 80 443
CMD ["./entrypoint"]
