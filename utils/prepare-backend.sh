#!/bin/bash -e

cp server.js dist
cd ./dist
git clone git@github.com:CoreyBurkhart/prioritizely-api-gateway.git
cd ./prioritizely-api-gateway
yarn install
yarn keygen
yarn prod:build
