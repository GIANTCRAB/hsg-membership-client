# Hackerspace Membership Client

This is the frontend of a Hackerspace membership management server. It includes feature like user registration,
user login and event management.

Both the [server](https://github.com/GIANTCRAB/hsg-membership-server) and [client](https://github.com/GIANTCRAB/hsg-membership-client) is needed. They should sit in a folder structure like this:
```
- somefolder/
    - hsg-membership-client/
        - src/
        - dist/
        - ...
    - hsg-membership-server/
        - src/
        - ...
```

## Installation

```
npm install
```

## Running

Build the client first, then run the server.

```
npm build --prod
```
