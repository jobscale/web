FROM ghcr.io/jobscale/nginx-net
SHELL ["bash", "-c"]
WORKDIR /usr/share/nginx
COPY --chown=nginx:staff nginx.conf .
COPY --chown=nginx:staff conf.d conf.d
RUN rm -fr /etc/nginx/*conf* html \
 && ln -sfn $(pwd)/nginx.conf /etc/nginx \
 && ln -sfn $(pwd)/conf.d /etc/nginx \
 && ln -sfn docs html
COPY --chown=nginx:staff ssl-keygen .
COPY --chown=nginx:staff entrypoint .
COPY --chown=nginx:staff error error
COPY --chown=nginx:staff docs docs
EXPOSE 443 80
CMD ["./entrypoint"]
