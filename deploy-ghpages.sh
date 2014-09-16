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
 git push --force --quiet "https://b0b7eadfc6dc37eca072dd0882e8f51a2fb23c0d@${GH_REF}" master:gh-pages > /dev/null 2>&1
)

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo -e "Starting to update gh-pages\n"

  #copy data we're interested in to other place
  cp -R coverage $HOME/coverage

  #go to home and setup git
  cd $HOME
  git config --global user.email "saad1200@gmail.com"
  git config --global user.name "saad1200"

  #using token clone gh-pages branch
  git clone --quiet --branch=gh-pages https://${GH_TOKEN}@github.com/saad1200/angular-seed  gh-pages > /dev/null

  #go into diractory and copy data we're interested in to that directory
  cd gh-pages
  cp -Rf $HOME/src/* .

  #add, commit and push files
  git add -f .
  git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"
  git push -fq origin gh-pages > /dev/null

  echo -e "Done magic with coverage\n"
fi