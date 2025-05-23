# Network Grub

Choose your grub boot entry when booting headlessly/wol.

# Features

| Feature                          | Status   |
|----------------------------------|----------|
| List boot entries                |Finished. Repository independent|
| Show current boot entry          |Finished. Repository independent|
| Change boot entry                |Finished. Repository independent|
| Serve boot config                |Finished. Repository independent|
| Upload, update boot entries      |Not yet|
| Wake-on-Lan over SSH             |Finished. Self deploy required|

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
https://grub.themajorones.dev/api/config?repo=<repo-url>&branch=<branch-name>&token=<token>
```

> [!TIP]
> 
> ```bash
> curl https://grub.themajorones.dev/api/config?repo=https://github.com/iamSlightlyWind/network-grub
> ```
>
> Will return the `state`.cfg file in the repository.

## Get current boot entry

To get the current boot entry, go to or make a request to the following endpoint:

```
https://grub.themajorones.dev/api/current?repo=<repo-url>&branch=<branch-name>&token=<token>
```

> [!TIP]
>
> ```bash
> curl https://grub.themajorones.dev/api/current?repo=https://github.com/iamSlightlyWind/network-grub
> ```
>
> Will return the current boot entry.

## Wake-on-Lan over SSH

To wake up a machine over SSH, go to or make a request to the following endpoint:

```
https://grub.themajorones.dev/api/boot?adress=<network-adress>&port=<port>&mac=<mac-address>
```

> [!TIP]
> ```bash
> curl https://grub.themajorones.dev/api/boot?adress=router.themajorones.dev&mac=00:00:00:00:00:00
> ```
>
> Will wake up the machine with the given MAC address over SSH.

> [!NOTE]
> Port is optional. If not provided, `22` will be used as default port.

> [!NOTE]
> The feature is not configured to accept authentication, but uses environment variables due to concerns about security. You will need to deploy the server yourself and set `SSH_USERNAME` and `SSH_PASSWORD` or `SSH_PRIVATE_KEY`.