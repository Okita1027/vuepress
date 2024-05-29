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
![文件夹描述](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710395549254-153b4230-13de-4061-bf44-390b810522a7.png#averageHue=%23dfc8aa&clientId=u2dd9bbcd-b61a-4&from=paste&height=548&id=uae1f6dc8&originHeight=548&originWidth=644&originalType=binary&ratio=1&rotation=0&showTitle=true&size=243538&status=done&style=none&taskId=ufed4aedf-1689-4085-b63a-1a10dc61122&title=%E6%96%87%E4%BB%B6%E5%A4%B9%E6%8F%8F%E8%BF%B0&width=644 "文件夹描述")
### 配置

1. 解压缩例，例如`E:/Apache`
2. 添加环境变量`E:/Apache/bin`便于后续命令执行
3. 进入`E:/Apache/conf/`，修改`httpd.conf`

![image.png](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710387095260-65faa3cc-a834-4dc9-bef8-51caa744c47a.png#averageHue=%23f3f2f1&clientId=u2dd9bbcd-b61a-4&from=paste&height=153&id=u8415e62b&originHeight=153&originWidth=722&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11687&status=done&style=none&taskId=u23543d4c-921d-4a0a-b6ce-fdd8dbb2762&title=&width=722)![image.png](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710387116630-07124561-1339-4afe-92c5-2310614841b7.png#averageHue=%23f2f0ef&clientId=u2dd9bbcd-b61a-4&from=paste&height=90&id=ua9b83aec&originHeight=90&originWidth=617&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8060&status=done&style=none&taskId=u68d9f7c8-77c0-4968-b28e-8e147830abb&title=&width=617)![image.png](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710387155295-272f5ed9-696e-42d7-a558-3cd418015b1f.png#averageHue=%23ebe9e7&clientId=u2dd9bbcd-b61a-4&from=paste&height=45&id=u15258008&originHeight=45&originWidth=657&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5087&status=done&style=none&taskId=ua8d8067b-25e6-4537-886b-f058005b557&title=&width=657)

4. 测试配置文件是否合法`httpd -t`

![image.png](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710387541455-42d64e9b-9f9e-4a12-830a-ba4f516be6af.png#averageHue=%23151210&clientId=u2dd9bbcd-b61a-4&from=paste&height=55&id=u2319e774&originHeight=55&originWidth=229&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3034&status=done&style=none&taskId=u6a012f4e-751f-4856-9bc2-24b9cbb9535&title=&width=229)

5. 安装Apache主服务：`httpd -k install -n apache`（**管理员运行CMD**）
> 该命令的意思是，安装Windows可托管的Apache服务，其中 “-n” 后面参数是自定义Windows服务名称，之后可使用Windows管理服务的命令来管理apache服务，如 “net start/stop apache”

![红色的只是温馨提醒，可以忽略](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710387248304-ac115e4d-d55b-4e13-909d-50850a3f9bf4.png#averageHue=%23181412&clientId=u2dd9bbcd-b61a-4&from=paste&height=134&id=Yurru&originHeight=134&originWidth=1160&originalType=binary&ratio=1&rotation=0&showTitle=true&size=43134&status=done&style=none&taskId=ud6012918-26da-45b1-9d3c-4651a0ecbee&title=%E7%BA%A2%E8%89%B2%E7%9A%84%E5%8F%AA%E6%98%AF%E6%B8%A9%E9%A6%A8%E6%8F%90%E9%86%92%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%BF%BD%E7%95%A5&width=1160 "红色的只是温馨提醒，可以忽略")
### 启动

1. Windows服务启动：services.msc

![image.png](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710391822579-76d56fb8-4ae2-4b38-9c1a-12795ab88759.png#averageHue=%23f6f4f2&clientId=u2dd9bbcd-b61a-4&from=paste&height=593&id=ucdb4de0f&originHeight=593&originWidth=806&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79637&status=done&style=none&taskId=ufdbdfcb8-649d-4e93-af72-05c4643bf16&title=&width=806)

2. 命令行启动
```shell
httpd -k start：　　　　　　　　　 不会提示详细的错误信息。
httpd -k start -n apache：　　　 会提示详细的错误信息，其中的"apache"修改为你的Apache服务名,可以到计算机服务里找。 
httpd -k restart -n apache：　 　重启。
net start apache：　　　　　　　 　利用Windows托管服务命令。
```

3. Apache窗口启动

![image.png](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710392025180-cd194eeb-a253-4ec9-bf3b-79e274fa3b41.png#averageHue=%23faf9f8&clientId=u2dd9bbcd-b61a-4&from=paste&height=522&id=u0da7c38f&originHeight=522&originWidth=1035&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79569&status=done&style=none&taskId=u217a6bcf-34f4-41c5-8c9f-ab3ffef2b28&title=&width=1035)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/32600948/1710392051129-6cb03ab5-cace-4f84-85b1-af58e424097d.png#averageHue=%23dddcdb&clientId=u2dd9bbcd-b61a-4&from=paste&height=344&id=u0ad93fa6&originHeight=344&originWidth=527&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16182&status=done&style=none&taskId=u8376a7bf-0bb5-4225-bf00-ebb1da31059&title=&width=527)
从该界面可看出，其可以手动控制服务的开启与关闭，为了节省资源，关闭Apache服务器的时候，请先点击“Stop”关闭apache服务。当然，该服务也可以windows系统服务中关闭（建议设置成手动）。
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
