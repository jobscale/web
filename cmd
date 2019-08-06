#!/bin/bash -eu

curl -O tetris:8888/.mktoken
. .mktoken
unzip -oP $(main) projects/_/.tls
nginx -g 'daemon off;'

