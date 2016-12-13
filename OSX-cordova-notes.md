
## Android Deploy

Following guide: https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html

Installed jdk8

http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

I don't think the standalone sdk tools exist anymore, just downloading and installing Android Studio then.
https://developer.android.com/studio/install.html?pkg=tools

Oh, here are the standalone CLI tools:
https://developer.android.com/studio/index.html#downloads

While installing Android Studio, I have custom installed to include the Virtual Device emulator. I hope it runs better than the Windows version which was way slow.

I have then added:

```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_112.jdk/Contents/Home/
export ANDROID_HOME=/Users/colelawrence/Library/Android/sdk
```

in my `~/.zshrc` file.

I didn't have my Android set up with OSX to do anything yet, so I immediately sought
the https://developers.google.com/web/tools/chrome-devtools/remote-debugging/ article
to get the right drivers without getting the wrong virus.

JK, I just needed to enable USB debugging, no driver needed.

## IOS Deploy with XCode

Following https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html

Could not get `ios-deploy` to install, so I switched to node 6 using `nvm use 6`

Node 6 has better support for most packages at the moment. (not necessarily significant just safe)


Ran into error

```shell
stderr: xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance`
```

And found this helpful comment
https://github.com/nodejs/node-gyp/issues/569#issuecomment-255589932

