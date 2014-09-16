#!/bin/bash
rm -rf out || exit 0;
mkdir out; 
node build.js
( cd out
 git init
 git config user.name "saad1200
 git config user.email "saad1200@gmail.com"
 cp -r ../src .
 git add .
 git commit -m "Deployed to Github Pages"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)