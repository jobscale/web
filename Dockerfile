FROM nginx
SHELL ["bash", "-c"]
WORKDIR /usr/share/nginx
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y vim git curl tmux \
 zip unzip iproute2 dnsutils iputils-ping netcat ncat procps
RUN rm -fr /var/lib/apt/lists/*
COPY . .
RUN rm -fr /etc/nginx/*conf* \
 && ln -sfn $(pwd)/nginx.conf /etc/nginx \
 && ln -sfn $(pwd)/conf.d /etc/nginx \
 && ln -sfn ../proxy.pac html/proxy.pac \
 && ln -sfn ../wpad.dat html/wpad.dat
EXPOSE 443 80
CMD ["./entrypoint"]
