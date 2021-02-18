#!/usr/bin/env bash
set -eu

COOKIE="Cookie: X-AUTH=X0X0X0X0X0X0X0X"
HOST=https://partner.credentials.svc.cluster.local

initialize() {
  touch env.json
  curl -sk -H "$COOKIE" $HOST/env.json | grep -i =A | awk -F'"' '{print $4}' | sed -e 's/=//g' | base64 -d | jq '.jsxjp.access' > env.json
  curl -sk -o env.bin -H "$COOKIE" $HOST/env.bin
  curl -sk -o alternative -H "$COOKIE" $HOST/alternative
  . alternative
}

resolver() {
  for h in $(grep proxy_pass /etc/nginx/conf.d/*conf | awk -F// '{print $2}' | awk -F: '{print $1}' | sort | uniq)
  do
    host $h || echo "127.0.0.1 $h" | tee -a /etc/hosts
  done
}

main() {
  [[ ! -f env.json ]] && initialize
  [[ ! -d jsx.jp ]] && ln -s tls jsx.jp
  resolver
  echo "nginx start"
  nginx -g 'daemon off;'
}

main
