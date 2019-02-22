FROM ubuntu:bionic
SHELL ["bash", "-c"]

WORKDIR /root
COPY inst .

RUN bash inst iDocker

EXPOSE 80
CMD ["/bin/bash", "-c", "bash"]
