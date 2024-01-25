# MacOS使用说明

## 目前系统兼容性
* 【🆗】macOS 10.12 Sierra
* 【🆗】macOS 10.13 High Sierra
* 【🆗】macOS 10.14 Mojave
* 【🆗】macOS 10.15 Catalina
* 【🆗】macOS 11 Big Sur
* 【🆗】macOS 12 Monterey
* 【🆗】Macbook M1
* 【🆗】Macbook M2

---

这个版本目前还在测试中

## 安装 (Intel X86)

1. 下载对应安装包

 Intel X86 安装包 下载

2. 点击安装包，根据提示默认安装

3. 当MacOS>=11时， 由于安全性的需要，安装时会报错，并提示安全警告，请输入管理员密码通过，或者是 打开系统偏好设置 中的 安全性与隐私，通过操作。如下列图：
[图片]

4. 此时已经安装完成了，但是需要手工打开驱动支持； 我们点击 "打开安全性偏好设置"；点击解锁，输入管理员密码解锁

[图片]

5. 此时，点击下面的 "来自开发者xxx的系统软件已被阻止载入" 后面的 "允许" 按钮; 会弹出提示重启的对话框
[图片]

6. 先不着急重启，点击 "以后"； 桌面上会弹出安装失败的提示框 (这个时候莫慌，这个失败是因为happyn的程序员菜，没有把错误框框隐藏掉，等他变强了会改掉的，现在先画个圈圈诅咒一下他然后将就将就)
[图片]

[图片]
7. 点击 "取消" 退出安装界面； 此时我们已经安装OK了；可以直接参照下面的 配置 章节；完成所有配置，然后重启机器；这个时候服务就会正常运行了；

## 安装 (M1 ARM)

1. 下载对应安装包

M1 Arm 安装包 下载

2. 点击安装包，根据提示默认安装

3. M1 MacOS；如果提示安装失败，是没有开放权限所致；

[图片]
  这个时候需要需要重启进入Recovery模式，开放第三方的Kext载入权限，原因参考这里； 然后再重新安装一遍就可以了 (这一步真的比较折腾，目前还没有太好的解决方法，happyn正在计划开发一个原生的驱动解决这个问题)；目前的临时解决方案详细操作如下

  1. 点击[关机]，然后长按电源键，至少10秒，将出现启动选项窗口
注意，请一定要看到下面这个画面，再松开按键
[图片]

  2. 选中[选项]，将出现[继续]按钮，点击此按钮。

[图片]

  3. 依次点击左上角的[实用工具]-[启动安全性实用工具]

[图片]

  4. 点击[安全策略]

[图片]

  5. 选择[降低安全性]，勾选“允许用户管理来自被认可开发者的内核扩展”，点击[好]。

[图片]

  6. 设置成功之后，点击屏幕左上角的苹果标志重启电脑，重启之后，打开[安全性与隐私]先点击左下角的小锁标志进行解锁，然后点击[允许]。

[图片]

  7. 提示：需要重新启动才能使用新的系统扩展，点击[重新启动]即可

[图片]

4. 参照下面的 配置 章节；完成所有配置，然后再一次重启机器；这个时候服务就会正常运行了；

## 安装 (M1 ARM) (安装IOS App)

如果您不愿意从事上面繁琐的配置，可以直接参考我们的 IOS使用说明 ，直接从App Store安装我们的IOS App到 M1的MacOS上面；

目前测试可以用，但是断开网络不生效，需要您到系统设置中手工停止VPN；

## 配置

1. 修改配置文件,您需要填入的4个参数(从您的happyn web端后台登录可以获取):
  更详细的参数说明请参考 建立Web账户

请用管理员权限修改以下配置文件:
```
/Applications/happynet/etc/happynet.conf
sudo vim /Applications/happynet/etc/happynet.conf

# ==============================
# 必改参数:这里填入您获取的服务ID
-c=VIP0xxxxx

# 必改参数:这里填入您获取的服务密钥
-k=1c20743f

# 这里填入您指定的网卡MAC地址，如果不需要手工指定的话，直接用 `#` 注释掉即可
# -m=xx:xx:xx:xx:xx:xx # 这里填入您的合法子网IP地址，这个地址不能与其它连入设备相冲突，范围是x.x.x.1--x.x.x.254
-a=10.251.56.61/24

# 必改参数:这里填入您的 `服务器地址:端口`
-l=vip00.happyn.cc:30002

# 启用数据压缩，节约传输流量，建议开启
-z1
```
2. 每次设定参数完毕后，执行以下命令设定为服务启动，让参数生效:

```
sudo launchctl load -w /Library/LaunchDaemons/net.happyn.macapp.plist
```
3. 如果是初次安装，请重启系统，服务会自动生效；

4. 查看服务log
```
tail -f /Applications/happynet/var/happynet.log
```

如果看到
HTML
"[OK] Edge Peer <<< ================ >>> Super Node"，
表示已经成功加入子网

5. 查看系统信息，您会看到一个名为 tap0的虚拟网卡
```
sudo ifconfig

tap0: flags=8843<UP,BROADCAST,RUNNING,SIMPLEX,MULTICAST> mtu 1290
        ether 16:96:63:c6:5f:c9
        inet 10.251.56.61 netmask 0xffffff00 broadcast 10.251.56.255
        media: autoselect
        status: active
        open (pid 34807)
```
6. 查看服务运行状态
```
$ sudo launchctl list|grep happyn
$ 51500   0       happynet
```
7. 五分钟后，刷新您的Web后台，此设备会自动记录到Web界面中

8. 停止服务
```
sudo launchctl unload  /Library/LaunchDaemons/net.happyn.macapp.plist
```

## 卸载
```
sudo /Applications/happynet/bin/uninstall.sh
```

## FAQ:

我所有设备上的程序已经显示运行成功，但是我Ping不通对方，为什么？

首先请检查是否参数都正确配置了，特别要保证 "服务ID+服务密钥" 是否在所有客户端都一致，有很多时候是我们太粗心;

其次请检查自己的机器是否开启了防火墙，可以先用机器的原有IP Ping一下，看看通不通；

最后请仔细检查Happynet的输出Log，看是否有"[OK]"的连接成功输出，如果没有，最大的可能是您短时间内多次连接，被系统判断为恶意扫描禁止了；此时您先点击“停止”，然后等待2分钟，再次重连即可

还有其它问题？

请登录web后台，扫一扫我们的在线支持寻求帮助；或者请点击 这里 向我们反馈问题，谢谢您的包容和支持！