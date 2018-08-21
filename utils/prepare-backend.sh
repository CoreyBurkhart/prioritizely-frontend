#!/bin/bash -e

cp server.js dist
cd ./dist
git clone git@github.com:CoreyBurkhart/prioritizely-backend.git
cd ./prioritizely-backend
yarn install
yarn keygen
yarn prod:build
