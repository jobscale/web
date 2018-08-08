#!/bin/bash
openssl req -x509 -nodes -sha256 -days 365 -newkey rsa:2048 -keyout cert.key -out cert.pem
