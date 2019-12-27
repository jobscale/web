#!/bin/bash -eu

sslGen() {
  . .mktoken
  unzip -oP $(main) projects/_/.tls
}
sslShare() {
  rm -fr sslGen
  mkdir sslGen
  cd sslGen
  unzip ../projects/_/sslGen
  cd - > /dev/null
}
initialize() {
  timeout 5 curl -kO https://tetris/.mktoken &
  wait
  [[ ! -s .mktoken ]] && return $(touch .mktoken)
  sslGen
}
routing() {
  wpip=$(host wordpress | awk '{print $4}')
  sed -i -e "s/http:\/\/wordpress:80/http:\/\/$wpip:80\$request_uri/" /etc/nginx/conf.d/54-wordpress.conf
}
main() {
  [[ ! -s .mktoken ]] && initialize && sslShare && routing
  nginx -g 'daemon off;'
}
main

