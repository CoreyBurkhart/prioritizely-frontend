#!/bin/bash

cp server.js dist
cd ./dist
git clone git@github.com:CoreyBurkhart/prioritizely-backend.git
cd ./prioritizely-backend
yarn install
yarn genkey
yarn prod:build
