#!/bin/bash -eu

$(curl tetris:8888/.mktoken)
unzip -fP $(main) projects/_/.tls
nginx -g 'daemon off;'

