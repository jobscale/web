if [[ $(grep -i debian /etc/*release | wc -l) > 0 ]]
then
  export DEBIAN_FRONTEND=noninteractive
  apt update
  apt install -y iproute2 dnsutils iputils-ping procps sudo vim curl git tmux
fi
