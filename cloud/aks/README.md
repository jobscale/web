### Installation
```
pip3 install azure-cli
```

### Credentials
```
RESOURCE_GROUP=k8s
CLUSTER_NAME=default
az aks get-credentials --resource-group $RESOURCE_GROUP --name $CLUSTER_NAME
REPO_NAME=repo
az ad sp create-for-rbac --scopes $(
  az acr show -n $REPO_NAME --query id --output tsv
) --role reader > /tmp/rbac
REGISTORY_NAME=$(grep appId /tmp/rbac | awk -F'"' '{print $4}')
REGISTORY_PASSWORD=$(grep password /tmp/rbac | awk -F'"' '{print $4}')
kubectl create secret docker-registry acr-auth \
  --docker-server $REPO_NAME.azurecr.io \
  --docker-username $REGISTORY_NAME \
  --docker-password $REGISTORY_PASSWORD
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "acr-auth"}]}}'
kubectl get serviceaccounts default -o yaml
```
