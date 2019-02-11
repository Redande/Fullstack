#!/bin/sh
npm run build
rm -rf ../../../Fullstack-osa3/build
cp -r build ../../../Fullstack-osa3/
