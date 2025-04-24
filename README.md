# Network Grub

Choose your grub boot entry when booting headlessly/wol.

# Features

| Feature                          | Status   |
|----------------------------------|----------|
| List boot entries                |Finished. Repository independent|
| Show current boot entry          |Not yet|
| Change boot entry                |Not yet|
| Serve boot config                |Not yet|
| Upload, update boot entries      |Not yet|

# API Guide

## List boot entries

To list GRUB configurations, go to or make a request to the following endpoint:

```
https://grub.themajorones.dev/api/list?repo=<your-repository-url>
```

> [!TIP]
> 
> ```bash
> curl "https://grub.themajorones.dev/api/list?repo=https://github.com/iamSlightlyWind/network-grub"
> ```
> 
> Will return
> 
> ```bash
> ["linux","windows"]
> ```