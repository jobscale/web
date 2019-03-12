#!/bin/bash -eu

country=JA
state=Osaka
locality=Osaka
organizational=jsx.jp
unit=Developpers
common=jsx.jp

rsa() {
  openssl req \
    -new \
    -newkey rsa:4096 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/C=$country/ST=$state/L=$locality/O=$organizational/CN=$common" \
    -keyout $common.key \
    -out $common.cert
}

ec() {
  openssl req \
    -new \
    -newkey ec \
    -pkeyopt ec_paramgen_curve:prime256v1 \
    -days 365 \
    -nodes \
    -x509 \
    -subj "/C=$country/ST=$state/L=$locality/O=$organizational/CN=$common" \
    -keyout $common.key \
    -out $common.cert
}

ec

