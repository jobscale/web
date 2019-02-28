FROM ubuntu:bionic
SHELL ["bash", "-c"]

WORKDIR /root
COPY . .

RUN ./inst iPhpWeb
RUN ./setup

EXPOSE 80
CMD ["/root/daemon"]
