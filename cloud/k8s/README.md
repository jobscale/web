# Web Site

## https://jsx.jp

Kubernetes v1.15.0

### install docker

```
iDocker() {
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
  sudo apt install -y docker-ce apt-transport-https
  sudo usermod -aG docker $(whoami)
} && iDocker && exit
```

```
# need login
docker ps -a
```

### install kubectl

```
iKubectl() {
  curl -LO https://storage.googleapis.com/kubernetes-release/release/$(
    curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt
  )/bin/linux/amd64/kubectl
  chmod +x kubectl
  sudo mv kubectl /usr/local/bin
} && iKubectl
```

### install go lang

```
iGolang() {
  sudo snap install go --channel=stable --classic
} && iGolang
```

### install kind

```
iKind() {
  GO111MODULE="on" go get sigs.k8s.io/kind@v0.4.0
} && iKind
```

### install npm with nodejs

```
iNodejs() {
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
  . ~/.bashrc
  LATEST=$(nvm ls-remote | grep 'Latest LTS' | tail -1 | awk '{print $1}')
  nvm install $LATEST
  nvm alias default $LATEST
  nvm use $LATEST
  node --version
  npm --version
  id
} && iNodejs
```

### create cluster

```
kind create cluster --config multinode.yaml
export KUBECONFIG="$(kind get kubeconfig-path --name="kind")"
kubectl get nodes -w
kubectl get pods -A -w
```

### kubectl config

```
alias kubeconfig='export KUBECONFIG="$(kind get kubeconfig-path --name="kind")"'
kubeconfig
kubectl config current-context
```

### setup metallb system

```
kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.8.1/manifests/metallb.yaml
kubectl apply -f https://git.io/km-config.yaml
```

### deployment Dashboard

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
kubectl apply -f admin-user-service-account.yaml
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
```

### kubectl proxy with Dashboard

```
kubectl proxy
xdg-open http://127.0.0.1:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/
```

### run deployment

```
kubectl create deployment nginx --image nginx
kubectl expose deployment nginx --name nginx --type LoadBalancer --port=443,80
kubectl get deployment,pods,svc
```

### ingress nginx

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
```

### tls termination

```
kubectl create secret tls wildcard-tls --cert sslGen/wildcard.jsx.jp.cert --key sslGen/wildcard.jsx.jp.key
echo 'apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: wildcard-tls
spec:
  backend:
    serviceName: nginx
    servicePort: 80' > ingress.yaml
kubectl apply -f ingress.yaml
```

### kubectl port-forward

```
sudo -E kubectl port-forward -n ingress-nginx --address 0.0.0.0 svc/ingress-nginx 443:443 80:80
```

### rollout deployment

```
kubectl rollout restart deployment nginx
kubectl get pods --watch
kubectl rollout status deployment nginx
kubectl rollout history deployment nginx
kubectl rollout history deployment nginx --revision 3
```

### rollback deployment

```
kubectl rollout undo deployment web --to-revision 2
kubectl get pods --watch
```
