# Gainsville


## Overview
Welcome to Gainsville, where _you_ can share your gains with the world! 

This is the sample [React Native](https://facebook.github.io/react-native/) project as presented by Eric Nograles to the Gainesville Dev Academy on February 25, 2016.  RN allows you to build _true_ native mobile applications using one JavaScript codebase.  Whereas platforms like Ionic and Cordova are really just "webpages presented as apps", in RN, you are building full fledged native applications using JavaScript!

On top of React Native, this project also includes a [Gulp](http://gulpjs.com/) file that helps automate some of the build processes you will have.  As React Native is barely even a year old, the tooling is still immature.

## Prerequisites
* A Mac (sorry, Windows users!)
* [Node.js](https://nodejs.org) - v4.2.6 or higher
* [Homebrew](http://brew.sh)
* [Xcode](https://developer.apple.com/xcode/download/)

## Installation Instructions 

1. Open a terminal.
2. Run `brew install watchman`
3. Run `brew install android`
    * Follow the steps in the command line to finish the Android SDK install process. *This might take a while*
4. Run `npm install -g react-native-cli gulp`
5. Clone this repository
    * In a directory of your choice, run `git clone https://github.com/ericnograles/gainsville.git`
6. Run `cd gainsville/`
7. Run `npm install`

## Running on iOS Simulator

1. Go to the directory where you cloned this repo
2. Run `react-native run-ios`

## Running on iOS Device

1. Plug in your iPhone to your Mac
2. Go to the directory where you cloned this repo
3. Run `gulp --env device`
4. Open Xcode
5. In Xcode, open the project `/gainsville/ios/gainsville.xcodeproj`
6. In the device selection above to the right of the stop button, select your iPhone
7. Click the Play Icon

## Running on Android Device

1. Plug in your Android device to your Mac
2. Go to the directory where you cloned this repo
3. Run `adb reverse tcp:8081 tcp:8081`
4. Run `react-native run-android`



