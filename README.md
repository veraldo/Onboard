# Onboard Git

## Environment and tools need to develop
Needs the Xcode iOS simulator

## Configurations
## Steps to run and debug
Inside the /AwesomeProject folder, just run

react-native run-ios

In case of failure, try using

rm -rf ios/build/; kill $(lsof -t -i:8081); react-native run-ios

## Build process
The build is made using the commands above.

## Gotcha's
