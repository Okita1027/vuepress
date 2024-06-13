---
title: WSL
shortTitle: WSL
description: WSL
date: 2024-06-13 12:52:01
categories: [Linux]
tags: [WSL]
---

## Ubuntu

### 安装

**基本安装**

1. Windows功能中开启`适用于Linux的Windows子系统`+`虚拟机平台`
2. powershell终端输入`wsl.exe --update`更新WSL相关组件
3. 在微软商店安装最新稳定版本 Ubuntu 22.04

---

**迁移到其它盘符**

1. `wsl -l -v`查看目前已安装的Linux发行版本
2. `wsl --export Ubuntu-22.04 D:\Ubuntu\init.tar`导出安装好的Ubuntu-22.04为tar文件到D盘的Ubuntu下
3. `wsl --import Ubuntu-22.04 D:\Ubuntu\Ubuntu-22.04 D:\Ubuntu\init.tar --version 2`以WSL2为版本利用tar文件把系统安装在D:\Ubuntu\Ubuntu-22.04文件夹下并以Ubuntu-22.04来命名

---

**图形化界面**

1. 切换安装源

   备份系统默认源文件

   ```sh
   sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
   ```

   切换为清华源，替换全部文件内容

   ```sh
   vim /etc/apt/sources.list
   ```

   ```sh
   # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
   deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
   # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
   deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
   # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
   deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
   # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
    
   deb http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
   # deb-src http://security.ubuntu.com/ubuntu/ jammy-security main restricted universe multiverse
    
   # 预发布软件源，不建议启用
   # deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
   # # deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
   ```

   添加 bionic universe 源以正确安装 vnc4server，在文件末尾追加内容

   ```sh
   sudo vim /etc/apt/sources.list
   ```

   ```sh
   deb http://archive.ubuntu.com/ubuntu/ bionic universe
   ```

   安装该仓库的公钥

   ```sh
   sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 3B4FE6ACC0B21F32
   ```

   更新安装源列表

   ```sh
   sudo apt update && sudo apt -y upgrade
   ```

2. 安装所需软件

   安装轻量版Ubuntu图形界面

   ```sh
   sudo apt-get install xfce4
   ```

   安装配置 xfce4 终端

   ```sh
   sudo apt-get install xfce4-terminal
   echo xfce4-session>.xsession
   ```

   安装 xrdp 相关（通过远程桌面来访问图形界面）

   ```sh
   sudo apt-get install vnc4server
   sudo apt-get install xrdp
   ```

   配置 xrdp 启动脚本，在文件开头插入内容，否则会黑屏

   ```sh
   sudo vim /etc/xrdp/startwm.sh
   ```

   ```sh
   unset DBUS_SESSION_BUS_ADDRESS
   unset XDG_RUNTIME_DIR
   . $HOME/.profile
   ```

   重启xrdp

   ```sh
   sudo service xrdp restart
   ```

   查看xrdp的运行状态和监听接口

   ```sh
   sudo service xrdp status
   ```

   - 默认的端口是 3389
   - 远程连接前要关闭xrdp状态，否则会闪退
   - 远程连接前WSL Ubuntu命令行需要打开，否则xrdp服务不会运行

3. 远程桌面连接

   打开Windows的远程桌面连接

   - 计算机名： IP地址:端口号
   - 用户名： 初次进入WSL Ubuntu系统时设置的用户名

---

**安装基础软件包**

更新系统上的所有软件包

```sh
sudo apt update
sudo apt upgrade -y
```

基本的工具：构建工具、版本控制系统、文本编辑器……

```sh
sudo apt install -y build-essential curl git vim wget
```

增强终端体验：Zsh、Oh My Zsh

```sh
sudo apt install -y zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

在终端中管理多个会话：tmux

```sh
sudo apt install -y tmux
```

监视系统资源使用情况：htop

```sh
sudo apt install -y htop
```

