#!/bin/bash

set -e

# Go to ios folder
cd ios

# Run release build
xcodebuild \
  -scheme example \
  -sdk iphonesimulator \
  -configuration Release \
  -derivedDataPath build \
  ONLY_ACTIVE_ARCH=YES \
  build
