# Linux环境下服务端搭建

在自己的服务器上建立HAPPYNET Server服务，帮助客户端打洞，同时在无法打洞的时候提供中转服务；

## 系统需求

1. 要求一个公网ip
2. docker环境

## 如何部署

#### 快速启动

1. 建立配置文件；这个文件存放将来连接客户端的服务ID；拥有这个服务ID的客户端，才能组网

```
sudo mkdir -p /opt/happyn/data/supernode
sudo echo "happyn001" >> /opt/happyn/data/supernode/community.list
sudo echo "happyn002" >> /opt/happyn/data/supernode/community.list
```

2. 启动happyn docker容器

```
sudo docker pull happyn/supernode:latest
sudo docker run -d --restart=always \
                   --privileged \
                   --net=host \
                   --name=happyn_supernode \
                   -v /opt/happyn/data/supernode:/var/supernode \
                   -p 7654:7654/udp \
                   -p 7654:7654/tcp \
                   -p 5645:5645/udp  \
                   happyn/supernode \
                   /usr/bin/supernode -p 7654 -t 5645 -v -M  -c /var/supernode/community.list -f
```
3. 配置防火墙；放通机器的 7654 端口 TCP/UDP通信

4. 查看log
```
sudo docker logs  -f happyn_supernode
```

#### 定制每个服务ID的子网

默认每个服务ID的子网是服务端自动分配的，一般是10.x.x.x/24 段的ip池；

如果想要自己定制每个服务ID的子网的话， 请修改`/opt/happyn/data/supernode/community.list`

内容格式如下:

```
happyn001 192.168.100.0/24
happyn002 192.168.101.0.24
```

修改后重新启动容器即可

#### 客户端连接

客户端要连接到自建的中转服务，需要匹配5个参数:

- 服务器地址：您自己的服务器IP
- 服务器端口：如例子，默认端口为7654
- 服务ID：如例子，即存储在 /opt/happyn/data/supernode/community.list 的字符串，为 happyn001、happyn002...
- 本地地址：您的虚拟服务子网IP地址，推荐的ip网段会在 docker log中出现; 比如下图中的10.192.193.0/24；您也可以自己指定；只要保证所有联网设备同一网段即可
  执行命令  `sudo docker logs -f happyn_supernode|grep HPYSERVERMSG` 查找系统分配的ip段，比如下图系统为happyn001服务ID的机器分配的ip段就是 10.192.193.0/24
- 服务密钥：您可以自己设定，但是只有相同 "服务ID+服务密钥"的机器才能互通

- 额外参数检查:
  - 加密方法： happyn客户端默认都是开启AES加密，如果您用了其他版本的N2N客户端，请统一设置为AES加密；
