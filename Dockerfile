FROM ghcr.io/jobscale/nginx-net
SHELL ["bash", "-c"]
WORKDIR /usr/share/nginx
COPY . .
RUN rm -fr /etc/nginx/*conf* \
 && ln -sfn $(pwd)/nginx.conf /etc/nginx \
 && ln -sfn $(pwd)/conf.d /etc/nginx \
 && ln -sfn ../proxy.pac html/proxy.pac \
 && ln -sfn ../wpad.dat html/wpad.dat
EXPOSE 443 80
CMD ["./entrypoint"]
