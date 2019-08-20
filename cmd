#!/bin/bash -eu

sslOpen() {
  touch .mktoken
  . projects/_/ssl-keygen
  mkdir tls
  mv sslGen/wildcard.jsx.jp.cert ssl/cert.pem
  mv sslGen/wildcard.jsx.jp.key ssl/cert.key
  openssl dhparam 2048 > ssl/dhparam.pem
}

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
  timeout 5 curl -O tetris:8888/.mktoken &
  wait
  [[ ! -s .mktoken ]] && return $(sslOpen | echo 0)
  sslGen
}

main() {
  [[ ! -s .mktoken ]] && initialize && sslShare
  nginx -g 'daemon off;'
}

main

