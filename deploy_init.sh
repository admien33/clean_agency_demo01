#!/bin/bash
set -e
echo "$TRAVIS_BRANCH"
echo "$TRAVIS_PULL_REQUEST"
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "master" ]
then 
  echo "This pullrequest was not made on master! No deploy!" 
  exit 1
fi 