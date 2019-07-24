# Web Site

## https://jsx.jp

Kubernetes v1.15.0

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
kind create cluster
kubectl get nodes --watch
kubectl get pods -A --watch
```

### kubectl config

```
alias kubeconfig='export KUBECONFIG="$(kind get kubeconfig-path --name="kind")"'
kubeconfig
kubectl config current-context
```

### deployment Dashboard

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
echo 'apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kube-system' > admin-user-service-account.yaml
kubectl apply -f admin-user-service-account.yaml
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
```

### kubectl proxy with Dashboard

```
kubectl proxy
xdg-open http://127.0.0.1:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy
```

### kubectl port-forward

```
kubectl port-forward --address 0.0.0.0 svc/kubernetes-dashboard -n kube-system 9443:443
sudo -E kubectl port-forward --address 0.0.0.0 svc/web 443:443 80:80
```
