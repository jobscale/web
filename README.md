### example deploy
```
git clone https://github.com/jobscale/web.git
cd web
main() {
  docker build . -t local/web
  docker run --rm --name web -p 80:80 -p 443:443 -d local/web
  sleep 5.5
  http_proxy= curl -sv http://127.0.0.1
  sleep 5.5
  http_proxy= curl -svk https://127.0.0.1
  docker stop web
} && main
```
