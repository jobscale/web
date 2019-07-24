# Web Site

## https://jsx.jp

### example

```
alias kubeconfig='export KUBECONFIG="$(kind get kubeconfig-path --name="kind")"'
kubeconfig
kubectl port-forward --address 0.0.0.0 svc/kubernetes-dashboard -n kube-system 8443:443
kubectl port-forward --address 0.0.0.0 svc/web 80:80
kubectl config current-context

```
