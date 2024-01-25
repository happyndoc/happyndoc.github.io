# Linux使用说明

##  目前系统兼容性

* 【🆗】Linux X86
* 【🆗】Linux X64
* 【🆗】Linux Arm64V8

## 手工配置

1. 下载安装包
- 最新版下载地址
- 历史版本存档

或者命令行下载

```
wget https://download.happyn.cn/linux/happynet-linux-x86-x64-dynamic-all-latest.tar.gz --no-check-certificate
```
## 安装

1. 下载完毕后解压文件

```
tar zxvf happynet-linux-x86-x64-dynamic-all-latest.tar.gz
```

2. 默认包含x64及x86、arm64v8多个平台，选择您所在的平台拷贝文件即可(如果不确定，选择x64即可)
```
# 进入解压文件夹
$ cd happynlinux

# 拷贝可执行文件
$ sudo cp bin/x64/happynet /usr/local/bin/
$ sudo chmod +x /usr/local/bin/happynet

# 拷贝配置文件
$ sudo  cp etc/happynet.conf /etc/

# 拷贝系统服务文件
$ sudo cp service/happynet.service /etc/systemd/system/

# 载入服务
$ sudo systemctl daemon-reload

# 如果要设置为开机启动，请执行
$ sudo systemctl enable happynet
```

3. 修改配置文件,您需要填入的4个参数(从您的happyn web端后台登录可以获取):

  更详细的参数说明请参考 建立Web账户
```
$ sudo vi /etc/happynet.conf

#==============================
#必改参数:这里填入您获取的服务ID
-c=VIP0xxxxx

#必改参数:这里填入您获取的服务密钥
-k=1c20743f

#这里填入您指定的网卡MAC地址，如果不需要手工指定的话，直接用 `#` 注释掉即可
#-m=xx:xx:xx:xx:xx:xx

#必改参数:这里填入您的合法子网IP地址，这个地址不能与其它连入设备相冲突，如果想要自动获取ip，直接用 `#` 注释掉即可
-a=10.251.56.100

#必改参数:这里填入您的 `服务器地址:端口`
-l=vip00.happyn.cc:30002

#启用数据压缩，节约传输流量，建议开启
-z1

#本地转发，默认关闭
#-r

#指定加密方法，联入同一网络的机器必须采用同一种加密方法
#-A2代表Twofish, -A3代表AES (happyn指定默认加密选项)
#-A4代表ChaCha20, -A5代表Speck-CTR
-A3

#可选参数：指定打洞对外监听端口，当您需要配置防火墙时，可以固定此端口，这样方便配置防火墙规则(UDP)
-p=0.0.0.0:55644

#调试信息输出，默认关闭
#-vvv
```
4. 更多高级配置请参考:Linux高级配置

5. 设定参数完毕后，执行以下命令启动:

```
$ sudo systemctl start happynet
```

6. 查看状态
```
$ sudo systemctl status happynet
```
如果看到
"[OK] Edge Peer <<< ================ >>> Super Node"，
表示已经成功加入子网

7. 查看系统信息，您会看到一个名为 edge0的虚拟网卡
```
$ sudo ip addr

 edge0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1290 qdisc pfifo_fast state UNKNOWN group default qlen 1000
    link/ether 8a:a4:b8:9c:0d:ac brd ff:ff:ff:ff:ff:ff
    inet 10.251.56.100/24 brd 10.251.56.255 scope global edge0
       valid_lft forever preferred_lft forever
    inet6 fe80::88a4:b8ff:fe9c:dac/64 scope link
       valid_lft forever preferred_lft forever
```

## 查看log
```
journalctl -f _SYSTEMD_UNIT=happynet.service

#或者指定看最后50行log
journalctl -n 50 -f  -u happynet
```

## 查看网络运行状况

如果您想要监控当前网络所有在线设备，请在Linux终端中输入命令 `netcat -u 127.0.0.1 5644` ； 然后按两下回车，会看到当前设备列表；
其中有一栏 `Peer To Peer`代表P2P，`Supernode Forward`代表中转；

详细操作请参考:✍️Linux故障排查

## 直接命令行运行
当完成配置后，如果您不希望以systemd服务的方式启动，可以直接命令行运行:

1. 启动命令

```
(启动后自动后台运行)

/usr/local/bin/happynet /etc/happynet.conf

(启动后前台运行)

/usr/local/bin/happynet /etc/happynet.conf -f
```
2. 停止命令
```
ps aux|grep happynet|grep -v grep|awk '{print $2}'|xargs kill  -SIGINT
```

## Docker容器方式运行

* 【🆗】Linux X64
* 【🆗】Linux Arm64V8

1. 启动命令
```
$ sudo docker run -d --restart=always --hostname=happyndocker \
        --privileged --net=host --name happynet happyn/happynet happynet \
        -a <ip> \
        -c <服务ID> \
        -k <服务密钥> \
        -l <服务器地址>:<端口> \
        -z1  --select-rtt  -f
```

示例
```
$ sudo docker run -d --restart=always --hostname=happyndocker \
        --privileged --net=host --name happynet happyn/happynet  happynet \
        -a 10.9.9.1 \
        -c VIP0xxxx \
        -k mypass \
        -l vip00.happyn.cc:40000 \
        -z1  --select-rtt  -f
```
查看log
```
docker logs -f happynet
```

## 在PVE的LXC容器中运行

PVE7.x系统，支持LXC容器模拟TUN设备；只需要在LXC容器配置文件 (一般位置在 /etc/pve/lxc/1xx.conf )的末尾加入如下配置项:

```
lxc.mount.entry: /dev/net/tun dev/net/tun none bind,create=file
lxc.cgroup2.devices.allow: c 10:200 rwm
```

之后重启LXC容器即可正常运行happynet客户端

## 升级:
1. 下载最新的安装包

2. 停止happynet服务:
```
$ sudo systemctl stop happynet
```
3. 解压安装包后覆盖可执行文件:
```
$ sudo cp bin/x64/happynet /usr/local/bin/happynet
```
4. 重新启动服务:
```
$ sudo systemctl start happynet
```
## FAQ:

客户端支持哪些平台?

目前支持主流Linux发行版的32位及64位系统；帮助文档中的示例采用了systemd作为服务管理工具，您当然也可以编写自己的脚本管理happynet服务

我所有设备上的程序已经显示运行成功，但是我Ping不通对方，为什么？

首先请检查是否参数都正确配置了，特别要保证 "服务ID+服务密钥" 是否在所有客户端都一致，有很多时候是我们太粗心;

其次请检查自己的机器是否开启了防火墙，可以先用机器的原有IP Ping一下，看看通不通；

最后请仔细检查Happynet的输出Log，看是否有"[OK]"的连接成功输出，如果没有，最大的可能是您短时间内多次连接，被系统判断为恶意扫描禁止了；此时您先“停止服务”，然后等待2分钟，再次重连即可

还有其它问题？

没关系，请到 交流论坛 向我们反馈问题，谢谢您的包容和支持！
