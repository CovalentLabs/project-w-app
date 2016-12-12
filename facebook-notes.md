```shell
cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="539675555556915" --variable APP_NAME="covalent"
```

```javascript

facebookConnectPlugin.login(
  [
    "public_profile"
  ],
  (success) => {
    console.log(success)
  },
  (failureString) => {
    console.error(failureString)
  }
)
```
Release Key Hash
Bmce+9aHdOoVtE7fS3B07tfj7Bc=
