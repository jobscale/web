# コンテナの作り方

### Install Docker
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt install -y docker-ce apt-transport-https
sudo usermod -aG docker $(whoami)
```

### Install kubectl
```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo add-apt-repository 'deb [arch=amd64] https://apt.kubernetes.io/ $(lsb_release -cs) main'
# sudo add-apt-repository 'deb [arch=amd64] https://apt.kubernetes.io/ kubernetes-xenial main'
sudo apt install -y kubectl
```

## Setup k8s Dashboard

### Install VirtualBox
```
curl -s https://www.virtualbox.org/download/oracle_vbox_2016.asc | sudo apt-key add -
sudo add-apt-repository 'deb [arch=amd64] https://download.virtualbox.org/virtualbox/debian $(lsb_release -cs) contrib'
sudo apt install virtualbox-6.0
```

### Install Minikube
```
# Check new version https://github.com/kubernetes/minikube/releases
wget https://github.com/kubernetes/minikube/releases/download/v1.2.0/minikube_1.2.0.deb
sudo dpkg -i minikube_1.2.0.deb
sudo apt install -f -y
sudo dpkg -i minikube_1.2.0.deb
```

### Start Minikube
```
minikube start
minikube addons list
minikube addons enable heapster
minikube addons enable dashboard
minikube addons enable ingress
kubectl get all --all-namespaces=true
nohup kubectl proxy --address=0.0.0.0 --accept-hosts='.*' &
nohup minikube dashboard &
no_proxy=127.0.0.1 curl http://127.0.0.1:8001/api/v1/namespaces/kube-system/services/http:kubernetes-dashboard:/proxy/
```

### Install Application
#### PHP
```bash
./inst iPhpWeb
```

#### Nodejs
```bash
./inst iNodejsWeb
```

#### Python
```bash
./inst iPythonWeb
```

#### Ruby
```bash
./inst iRubyWeb
```

#### Java
```bash
./inst iJava
```

### Docker Operation
#### Build Docker
```bash
vi Dockerfile
docker build . -t REPOSITORY:TAG
```

#### Run Container
```bash
docker run -it -v /home/user/projects:/root/projects --network=host REPOSITORY:TAG
```

#### Attach tty Running Container
```bash
docker exec -it NAMES bash
```

#### Start Existing Container
```bash
docker start NAMES
```

#### Stop Existing Container
```bash
docker stop NAMES
```

#### Show Running Container
```bash
docker ps
```

#### Show Existing Container
```bash
docker ps -a
```

#### Remove Existing Container
```bash
docker rm $(docker ps -aq)
```

#### Show Existing Images
```bash
docker images
```

#### Remove Existing Images
```bash
docker rmi $(docker images -q)
```
