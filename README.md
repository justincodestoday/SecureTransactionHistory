This is a simple and secure transaction history screen demo built using **React Native** and **TypeScript**.

This demo has only been tested on an Android simulator. However, the codebase has been developed for both iOS and Android platforms. So feel free to test the demo on either platforms. There are instructions here to guide you to run the demo on your local machine.

> **Note** that in order to use biometrics to login to the transaction history screen, you must use a physical device. It could either be an iPhone or an Android device.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
