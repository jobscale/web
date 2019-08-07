#!/bin/bash -eu

sslGen() {
  curl -O tetris:8888/.mktoken
  . .mktoken
  unzip -oP $(main) projects/_/.tls
  rm -fr sslGen
  mkdir sslGen
  cd sslGen
  unzip projects/_/sslGen
  cd - > /dev/null
}
[[ ! -s .mktoken ]] && sslGen
nginx -g 'daemon off;'

