# Network Grub

Choose your grub boot entry when booting headlessly/wol.

# Features

| Feature                          | Status   |
|----------------------------------|----------|
| List boot entries                |Finished. Repository independent|
| Show current boot entry          |Finished. Repository independent|
| Change boot entry                |Not yet|
| Serve boot config                |Not yet|
| Upload, update boot entries      |Not yet|

# API Guide

> [!NOTE]
> Branch is optional. If not provided, `grub` will be used as default branch.

## List boot entries

To list GRUB configurations, go to or make a request to the following endpoint:

```
https://grub.themajorones.dev/api/list?repo=<repo-url>&branch=<branch-name>
```

> [!TIP]
>
> ```bash
> curl https://grub.themajorones.dev/api/list?repo=https://github.com/iamSlightlyWind/network-grub
> ```
> 
> Will return
> 
> ```bash
> ["linux","windows"]
> ```

## Change boot entry

To change the boot entry, make a request to the following endpoint:

```
https://grub.themajorones.dev/api/change?token=<token>&repo=<repo-url>&branch=<branch-name>&state=<boot-entry>
```
> [!TIP]
>
> ```bash
> curl https://grub.themajorones.dev/api/change?token=1234567890&repo=https://github.com/iamSlightlyWind/network-grub&state=linux
> ```
>
> Will change the boot entry to linux.


> [!NOTE]
> The token is a PAT (Personal Access Token) that is used to authenticate the request. You need to create a fine-grained PAT with the read and write permissions for your repository which contains the grub configuration files.