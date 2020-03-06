## Install k3d
```
iK3d() {
  curl -s https://raw.githubusercontent.com/rancher/k3d/master/install.sh | bash
} && iK3d
```
## Install istioctl
```
iIstio() {
  ISTIOVERSION=$(git ls-remote --refs --tags https://github.com/istio/istio.git | grep -v -E '(alpha|beta|rc)\.[0-9]$' | sort -t '/' -k 3 -V | tail -1 | awk -F/ '{print $3}')
  getRelease() {
    FILE=istio-$ISTIOVERSION-linux.tar.gz
    echo "$FILE Downloading..."
    curl -sLO https://github.com/istio/istio/releases/download/$ISTIOVERSION/$FILE
    tar xf $FILE
    sudo cp -p istio-$ISTIOVERSION/bin/istioctl /usr/local/bin
    sudo mv istio-$ISTIOVERSION /home
  }
  [[ ! -d /home/istio-$ISTIOVERSION ]] && getRelease
  echo istioctl manifest apply --set installPackagePath=$(find /home/istio-* -type d -name charts | grep operator | tail -1)
} && iIstio
```
## Create k3d cluster
```
k3d create --server-arg --no-deploy --server-arg traefik
ln -sfn $(k3d get-kubeconfig --name='k3s-default') $HOME/.kube/config
```
## Apply istio
```
istioctl manifest apply --set installPackagePath=$(find /home/istio-* -type d -name charts | grep operator | tail -1)
```
## Show resource
```
docker stats --no-stream
```
