# Web Site

## https://jsx.jp

Kubernetes v1.15.0

### install docker

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt install -y docker-ce apt-transport-https
sudo usermod -aG docker $(whoami)
exit
```

relogin

```
docker ps -a
```

### install kubectl

```
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin
```

### install go lang

```
sudo snap install go --channel=stable --classic
```

### install kind

```
GO111MODULE="on" go get sigs.k8s.io/kind@v0.4.0
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

### kubectl port-forward

```
. configure
portForward
```

### service ingress
```
. configure
svc nginx
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
