## Kubernetes v1.15.0

### IAM Role 権限

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iam:*Profile*",
        "iam:*Asume*",
        "iam:*Role*"
      ],
      "Resource": [
        "arn:aws:iam::*:instance-profile/*",
        "arn:aws:iam::*:role/*"
      ]
    }
  ]
}
```

### Create

```
eksctl create cluster --name default --version 1.13 --nodegroup-name standard-workers --node-type t3.medium --nodes 1 --nodes-min 1 --nodes-max 1 --node-ami auto
```

### Delete

```
eksctl delete cluster --name default
```

### Update config

```
kubectl get svc -A
aws eks update-kubeconfig --name default
aws-iam-authenticator init -i 0
```

### Dashboard

```
kubectl get nodes --watch
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
```

### heapster / grafana

```
git clone https://github.com/kubernetes/heapster.git
kubectl apply -f heapster/deploy/kube-config/influxdb
```

or

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/influxdb/heapster.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/influxdb/influxdb.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/rbac/heapster-rbac.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/heapster/master/deploy/kube-config/influxdb/grafana.yaml
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
```

### Token

```
kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep admin-user | awk '{print $1}')
kubectl proxy
```

### Example deploy

```
kubectl create deployment nginx --image nginx
kubectl expose deployment nginx --port 80,443 --type LoadBalancer --name nginx
kubectl get deployment,pods,svc

kubectl create deployment mongo --image mongo
kubectl expose deployment mongo --port 27017 --type ClusterIP --name mongo
kubectl get deployment,pods,svc

kubectl create deployment blog --image jobscale/blog
kubectl expose deployment blog --port 80 --target-port 3344 --type LoadBalancer --name blog
kubectl get deployment,pods,svc
```

