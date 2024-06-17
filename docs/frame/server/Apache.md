---
title: Apache
shortTitle: Apache
description: Apache
date: 2024-05-28 17:06:01
categories: [服务器]
tags: [Apache]
---
## Windows部署
```shell
# 安装服务
httpd -k install -n apache

# 启动服务
net start apache
httpd -k start -n apache

# 关闭服务
net stop apache
httpd -k stop -n apache

# 重启服务
httpd -k restart -n apache

# 卸载服务
## 卸载服务时先停止
httpd -k stop -n apache
## 再卸载服务
httpd -k uninstall -n apache
```
![文件夹描述](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache01.png "文件夹描述")
### 配置

1. 解压缩例，例如`E:/Apache`
2. 添加环境变量`E:/Apache/bin`便于后续命令执行
3. 进入`E:/Apache/conf/`，修改`httpd.conf`

![image.png](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache02.png)![image.png](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache03.png)![image.png](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache04.png)

4. 测试配置文件是否合法`httpd -t`

![image.png](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache05.png)

5. 安装Apache主服务：`httpd -k install -n apache`（**管理员运行CMD**）
> 该命令的意思是，安装Windows可托管的Apache服务，其中 “-n” 后面参数是自定义Windows服务名称，之后可使用Windows管理服务的命令来管理apache服务，如 “net start/stop apache”

![红色的只是温馨提醒，可以忽略](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache06.png "红色的只是温馨提醒，可以忽略")
### 启动

1. Windows服务启动：services.msc

![image.png](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache07.png)

2. 命令行启动
```shell
httpd -k start：　　　　　　　　　 不会提示详细的错误信息。
httpd -k start -n apache：　　　 会提示详细的错误信息，其中的"apache"修改为你的Apache服务名,可以到计算机服务里找。 
httpd -k restart -n apache：　 　重启。
net start apache：　　　　　　　 　利用Windows托管服务命令。
```

3. Apache窗口启动

![image.png](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache08.png)
![image.png](https://cdn.jsdelivr.net/gh/Okita1027/knowledge-database-images@main/frame/server/apache/apache09.png)
从该界面可看出，其可以手动控制服务的开启与关闭，为了节省资源，关闭Apache服务器的时候，请先点击“Stop”关闭apache服务。当然，该服务也可以windows系统服务中关闭（建议设置成手动)。
### 卸载
 若Apache服务器软件不想用了，想要卸载，一定要先卸载apache服务，然后删除安装文件（切记，若直接删除安装路径的文件夹，会有残余文件在电脑，可能会造成不必要的麻烦），在cmd命令窗口，输入如下（建议先停止服务再删除）：
```shell
httpd -k stop
httpd -k uninstall

Windows卸载服务命令：sc delete 服务名
```
### 其它配置
```nginx
LoadModule php_module "E:/Apache/php8apache2_4.dll"
```
```nginx
	AddType application/x-httpd-php .php
	PHPIniDir "E:/PHP"
```
## Linux部署
