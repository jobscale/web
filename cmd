#!/bin/bash -eu

sslGen() {
  unzip -oP $(cat env.json) projects/_/.tls
}
sslShare() {
  rm -fr sslGen
  mkdir sslGen
  cd sslGen
  unzip ../projects/_/sslGen
  cd - > /dev/null
}
initialize() {
  timeout 5 curl -sk -H "Cookie: X-AUTH=X0X0X0X0X0X0X0X" https://partner/env.json | grep -i =A | awk -F'"' '{print $4}' | sed -e 's/=//g' | base64 -d | jq '.jsxjp.access' > env.json &
  wait
  [[ ! -f env.json ]] && return $(touch env.json)
  sslGen
}
routing() {
  wpip=$(host wordpress | awk '{print $4}')
  sed -i -e "s/http:\/\/wordpress:80/http:\/\/$wpip:80\$request_uri/" /etc/nginx/conf.d/54-wordpress.conf
}
main() {
  [[ ! -f env.json ]] && initialize && sslShare && routing
  nginx -g 'daemon off;'
}
main

