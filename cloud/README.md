# コンテナの作り方

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

#### Attach Running Container
```bash
docker exec -it NAMES bash
```

#### Start Existing Container
```bash
docker start -i NAMES
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

#### Show Existing Image
```bash
docker images
```

#### Remove Existing Image
```bash
docker rm $(docker images -q)
```

### Setup k8s Dashboard

#### Install minikube
Check new version https://github.com/kubernetes/minikube/releases
```bash
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.34.1/minikube-linux-amd64 && chmod +x minikube && sudo cp minikube /usr/local/bin/ && rm minikube
curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/v1.13.2/bin/linux/amd64/kubectl && chmod +x kubectl && sudo cp kubectl /usr/local/bin/ && rm kubectl
curl -Lo kubeadm https://storage.googleapis.com/kubernetes-release/release/v1.13.2/bin/linux/amd64/kubeadm && chmod +x kubeadm && sudo cp kubeadm /usr/local/bin/ && rm kubeadm
curl -Lo kubelet https://storage.googleapis.com/kubernetes-release/release/v1.13.2/bin/linux/amd64/kubelet && chmod +x kubelet && sudo cp kubelet /usr/local/bin/ && rm kubelet
```

#### Setting minikube permission
```bash
setadm() { sudo chown :adm $1; sudo chmod g+w $1; }
setadm /usr/bin
setadm /lib/systemd/system
setadm /etc/systemd/system
setadm /var/lib
sudo chmod 4755 /bin/systemctl
sudo mkdir /etc/kubernetes
setadm /etc/kubernetes
minikube start --bootstrapper=kubeadm --vm-driver=none
minikube status
minikube dashboard
minikube stop
minikube delete
```

#### Start minikube
```bash
minikube status
minikube start --bootstrapper=kubeadm --vm-driver=none
minikube dashboard
```

