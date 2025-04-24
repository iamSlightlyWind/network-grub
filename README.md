# Network Grub

Choose your grub boot entry when booting headlessly/wol.

# Features

| Feature                          | Status   | Private Repository Access |
|----------------------------------|----------|---------------------------|
| List boot entries                |Finished. Repository independent| Not yet|
| Show current boot entry          |Not yet| Not yet|
| Change boot entry                |Finished. Repository independent| Not yet|
| Serve boot config                |Finished. Repository independent| Not yet|
| Upload, update boot entries      |Not yet| Not yet|

# API Guide

> [!NOTE]
> Branch is optional. If not provided, `grub` will be used as default branch.

> [!NOTE]
> The token is a PAT (Personal Access Token) that is used to authenticate the request. You only need the token to change the boot entry or to read from private repositories.
>
> You need to create a fine-grained PAT with the read and write permissions for your repository which contains the grub configuration files.

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

To change the boot entry, go to or make a request to the following endpoint:

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

## Serve boot config

To get the boot config, make a request to the following endpoint:

```
https://grub.themajorones.dev/api/boot?repo=<repo-url>&branch=<branch-name>&token=<token>
```

> [!TIP]
> 
> ```bash
> curl https://grub.themajorones.dev/api/boot?repo=https://github.com/iamSlightlyWind/network-grub
> ```
>
> Will return the `state`.cfg file in the repository.