FROM ubuntu:bionic
SHELL ["bash", "-c"]

WORKDIR /root
COPY . .

RUN . inst iNginx

EXPOSE 80
CMD ["/root/daemon"]
