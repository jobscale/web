#!/bin/bash -eu

curl -O tetris:8888/.mktoken
. .mktoken
unzip -fP $(main) projects/_/.tls
nginx -g 'daemon off;'

