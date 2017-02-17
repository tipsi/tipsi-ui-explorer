#!/bin/bash

set -e

isOSX() {
  [ "$(uname)" == "Darwin" ]
}

###################
# BEFORE INSTALL  #
###################

# Skip iOS step if current os is not macOS
! isOSX && echo "Current os is not macOS, setup for iOS will be skipped"

# Go to example folder
cd example

###################
# INSTALL         #
###################

# Install dependencies
npm install

###################
# BEFORE BUILD    #
###################

# Run appium
(pkill -9 -f appium || true)
npm run appium > /dev/null 2>&1 &

###################
# BUILD           #
###################

# Build Android app
npm run build:android
# Build iOS app
if isOSX; then
  npm run build:ios
fi

###################
# TESTS           #
###################

# Run unit tests
npm run test:unit
# Run Android e2e tests
npm run test:e2e:android
# Run iOS e2e tests
if isOSX; then
  npm run test:e2e:ios
fi
