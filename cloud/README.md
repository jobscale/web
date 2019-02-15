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

#### Runch Docker
```bash
docker run -it -v /home/user/projects:/root/projects --network=host REPOSITORY:TAG
```

#### Start Existing Docker
```bash
docker start -i NAMES
```
