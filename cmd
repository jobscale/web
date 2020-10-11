#!/bin/bash -eu

tlsGen() {
  unzip -oP $(sed -e 's/"//g' env.json) .tls
}

alternative() {
  timeout 5 curl -sk -o alternative -H "Cookie: X-AUTH=X0X0X0X0X0X0X0X" https://partner/alternative
  [[ ! -s alternative ]] && return 1
  timeout 5 curl -sk -o env.bin -H "Cookie: X-AUTH=X0X0X0X0X0X0X0X" https://partner/env.bin
  [[ ! -s env.bin ]] && return 1
  . alternative
}

initialize() {
  ./check || return $(touch env.json)
  timeout 5 curl -sk -H "Cookie: X-AUTH=X0X0X0X0X0X0X0X" https://partner/env.json | grep -i =A | awk -F'"' '{print $4}' | sed -e 's/=//g' | base64 -d | jq '.jsxjp.access' > env.json &
  wait
  [[ ! -s env.json ]] && return $(touch env.json)
  tlsGen
  alternative
}

dummy() {
  for h in $(grep proxy_pass /etc/nginx/conf.d/*conf | awk -F// '{print $2}' | awk -F: '{print $1}' | sort | uniq)
  do
    host $h || echo "127.0.0.1 $h" | tee -a /etc/hosts
  done
}

main() {
  [[ ! -f env.json ]] && initialize
  dummy
  echo "nginx start"
  nginx -g 'daemon off;'
}

main
