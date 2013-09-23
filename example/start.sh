#!/bin/bash

pushd `dirname $0`
npm install
DIR=`pwd`
popd
pushd `git rev-parse --show-cdup`
node "$DIR/app.js"
popd
