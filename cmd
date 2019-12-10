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
  timeout 5 curl -O tetris/.mktoken &
  wait
  [[ ! -s .mktoken ]] && return $(touch .mktoken)
  sslGen
}

main() {
  [[ ! -s .mktoken ]] && initialize && sslShare
  nginx -g 'daemon off;'
}

main

